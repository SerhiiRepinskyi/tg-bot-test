export const showMenu = (bot, chatId) => {
  bot.telegram.sendMessage(chatId, "Choose an action below:", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Find out the weather",
            request_location: true,
          },
        ],
        ["Get the cat"],
        ["Close"],
      ],
    },
  });
};

export const closeMenu = (bot, chatId) => {
  bot.telegram.sendMessage(
    chatId,
    'The keyboard is closed. To start, write: "menu"',
    {
      reply_markup: {
        remove_keyboard: true,
      },
    }
  );
};
