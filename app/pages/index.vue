<script setup>
const title = "Messages from telegram bot";
const description = "Messages from users who left them in my Telegram bot.";
const keywords = "telegram, bot, messages, skidanovdima";
useSeoMeta({
  title: title,
  description: description,
  keywords: keywords,
  ogTitle: title,
});
</script>

<template>
  <div class="container">
    <h1>Messages from telegram bot...</h1>
    <p>
      Publishing messages sent to the Telegram bot
      <a href="https://t.me/skidanovdima_msgs_bot">skidanovdima_msgs_bot</a>.
    </p>
    <MessagesWrapper />
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 30px;
  max-width: 1140px;
  @media (max-width: 575px) {
    padding: 0 5px;
  }
}
</style>
