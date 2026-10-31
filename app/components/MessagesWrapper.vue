<script setup>
const config = useRuntimeConfig();
const totalPages = useState("messages-total-count", () => 0);
const limit = 10;
const footer = ref(null);
let page = 2;

/**
 * Загрузка сообщений на сервере.
 */
const msgs = await useFetch(() => `${config.public.apiBase}/messages`, {
  query: { limit: limit, page: 1 },
  timeout: config.public.timeout,
  onResponse({ response }) {
    const count = response.headers.get("x-total-count");
    if (count) {
      totalPages.value = Math.ceil(Number(count) / limit);
    }
  },
});
if (msgs.error.value) {
  throw new Error("Error loading data from the server.");
}
const MessageList = ref([]);
let observer = null;
SmoothMessages(msgs.data.value?.messages ?? [], 0);

/**
 * Плавное появление сообщений.
 * @param messages - Массив сообщений.
 * @param delay - Скорость появления каждого нового сообщения.
 */
function SmoothMessages(messages, delay = 250) {
  if (messages.length === 0) return;
  if (delay === 0) {
    MessageList.value.push(...messages);
    return;
  }
  if (observer && footer.value) {
    observer.unobserve(footer.value);
  }
  messages.forEach((message, index) => {
    setTimeout(() => {
      MessageList.value.push(message);
    }, delay * index);
  });
  setTimeout(
    () => {
      if (observer && footer.value && page <= totalPages.value) {
        observer.observe(footer.value);
      }
    },
    delay * (messages.length - 1),
  );
}

onMounted(() => {
  /**
   * Обработка события вызова загрузки новых сообщений.
   */
  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };
  const callback = function (entries, observer) {
    if (entries[0].isIntersecting && page <= totalPages.value) {
      fetchMessages();
    }
  };
  observer = new IntersectionObserver(callback, options);
  observer.observe(footer.value);

  /**
   * Загрузка новых сообщений на клиенте.
   */
  async function fetchMessages() {
    const { _data: data, ok: ok } = await $fetch.raw(
      `${config.public.apiBase}/messages`,
      {
        query: { limit: limit, page: page },
        timeout: config.public.timeout,
      },
    );
    if (!ok) {
      throw new Error("Error loading data from the server!");
    }
    SmoothMessages(data.messages ?? []);
    page += 1;
  }
});
</script>

<template>
  <div class="message" v-for="message in MessageList" :key="message.id">
    <div class="info">
      <div class="username">
        <a
          v-if="message.telegram_user_name.length > 0"
          :href="'https://t.me/' + message.telegram_user_name"
          >@{{ message.telegram_user_name }}</a
        >
        <span v-else class="unknown">unknown</span>
      </div>
      <div class="date">{{ message.created_at }}</div>
    </div>
    <div>{{ message.text }}</div>
  </div>
  <div ref="footer" class="footer"></div>
</template>

<style scoped>
.message {
  margin: 25px 0;
  animation: show 2s ease-out forwards;
  .info {
    display: flex;
    gap: 10px;
    font-size: 16px;
    line-height: 1.5;
    .username {
      a {
        text-decoration: none;
      }
      .unknown {
        color: gray;
      }
    }
    .date {
      color: gray;
    }
  }
}
.footer {
  height: 10px;
}
@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
