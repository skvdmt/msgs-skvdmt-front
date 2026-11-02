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
    <a href="https://skvdmt.ru/"
      ><img
        class="icon-home"
        src="/icons/home.svg"
        width="32"
        height="32"
        alt="link to author home page"
        title="to home"
    /></a>
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
  padding: 0 3rem;
  max-width: 114rem;
  @media (max-width: 575px) {
    padding: 0 1.5rem;
  }
  .icon-home {
    display: block;
    margin: 2rem 0 1rem;
    width: 3.2rem;
    height: 3.2rem;
  }
  @media (prefers-color-scheme: light) {
    .icon-home {
      filter: invert(41%) sepia(87%) saturate(442%) hue-rotate(128deg)
        brightness(91%) contrast(96%);
    }
  }
  @media (prefers-color-scheme: dark) {
    .icon-home {
      filter: invert(80%) sepia(12%) saturate(250%) hue-rotate(115deg)
        brightness(92%) contrast(90%);
    }
  }
  h1 {
    margin: 0 0 2rem;
    line-height: 1.2;
  }
}
</style>
