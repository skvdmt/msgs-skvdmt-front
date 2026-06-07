<script setup>
import { onMounted, ref } from "vue";
import get from "@/get";

const MessageList = ref([]);
const footer = ref(null);
const limit = 10;

let page = 1;
let totalPages;
let num = 1;

function fetchMessages() {
  get("/messages?limit=" + limit + "&page=" + page, function (total, data) {
    totalPages = Math.ceil(total / limit);
    // Форматирование сообщения.
    data.messages.forEach((m) => {
      const d = new Date(Date.parse(m.created_at));
      m.created_at = d.toLocaleString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      m.num = num;
      num += 1;
    });
    MessageList.value = [...MessageList.value, ...data.messages];
    page += 1;
  });
}

onMounted(() => {
  fetchMessages();
  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };
  const callback = function (entries, observer) {
    if (entries[0].isIntersecting && page <= totalPages) {
      fetchMessages();
    }
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(footer.value);
});
</script>

<template>
  <div class="message" v-for="message in MessageList" :key="message.id">
    <!-- <div>{{ message.num }}</div> -->
    <div class="info"">
      <div class="username">
        <a v-if="message.telegram_user_name.length > 0" :href="'https://t.me/' + message.telegram_user_name">@{{ message.telegram_user_name }}</a>
        <span v-else class="unknown">unknown</span>
      </div>
      <div class="date">{{ message.created_at }}</div>
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
      color:gray;
    }
  }
}
.footer {
  height: 10px;
}
</style>
