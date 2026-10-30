<script setup>
const config = useRuntimeConfig();
const totalPages = useState("messages-total-count", () => 0);
const limit = 10;
const footer = ref(null);
let page = 1;

/**
 * Загрузка сообщений на сервере.
 */
const msgs = await useFetch(
  () => `${config.public.apiBase}/messages?limit=${limit}&page=${page}`,
  {
    timeout: config.public.timeout,
    onResponse({ response }) {
      const count = response.headers.get("x-total-count");
      if (count) {
        totalPages.value = Number(count) / limit;
      }
    },
  },
);

if (msgs.error.value) {
  throw new Error("Error loading data from the server.");
}

const MessageList = ref(msgs.data.value?.messages || []);

/**
 * Загрузка новых сообщений на клиенте.
 */
async function fetchMessages() {
  const data = await $fetch(
    `${config.public.apiBase}/messages?limit=${limit}&page=${page}`,
  );
  MessageList.value = [...MessageList.value, ...data.messages];
  page += 1;
}

onMounted(() => {
  /**
   * Обработка события вызова загрузки новых сообщений.
   */
  page += 1;
  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };
  const callback = function (entries, observer) {
    if (entries[0].isIntersecting && page <= totalPages.value) {
      fetchMessages();
    }
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(footer.value);
});

/**
 * Форматирование даты.
 */
function formatSingleDate(dateString) {
  if (!dateString) return "";
  const d = new Date(Date.parse(dateString));
  if (isNaN(d.getTime())) return dateString; // Если пришла не дата
  const pad = (num) => String(num).padStart(2, "0");
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
}
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
      <div class="date">{{ formatSingleDate(message.created_at) }}</div>
    </div>
    <div>{{ message.text }}</div>
    <p></p>
  </div>
  <div ref="footer" class="footer"></div>
</template>

<style scoped>
.message {
  margin: 25px 0;
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
</style>
