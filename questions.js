var questions_dict = {}
questions_dict[0] = {
  q: "Язык для разработки под Android? \n Kotlin Swift Java Goland",
  correct: ["kotlin", "котлин", "java", "ява", "джава"],
  type: "Mobile"
}

questions_dict[1] = {
  q: "Среда для разработки для IOS \n Android Studio Xcode PyCharm IntelijIDEA",
  correct: ["xcode"],
  type: "Mobile"
}

questions_dict[2] = {
  q: "Метод оптимизации нейронных сетей \n Градиентный спуск перебор золотого сечения",
  correct: ["градиент", "градиентный"],
  type: "ML"
}

questions_dict[3] = {
  q: "Какие сети применяют для работы с изображениями? \n полносвязные сверточные глубокие",
  correct: ["сверточные", "cnn"],
  type: "ML"
}

questions_dict[4] = {
  q: "Первый метод жизненного цикла Activity \n onStart onCreate onResume",
  correct: ["oncreate", "create"],
  type: "Mobile"
}

questions_dict[5] = {
  q: "Фреймворк обучения нейросетей \n OpenCV Tensorflow Kornia Sci-Image",
  correct: ["tensorflow"],
  type: "ML"
}

questions_dict[6] = {
  q: "Дизайн система в Андроид называется \n Material Design, Human Interface Guidelines",
  correct: ["material", "материальный"],
  type: "Design"
}

questions_dict[7] = {
  q: "Какой вид дизайна применяется для мобильных приложений? \n веб, графический, ui/ux",
  correct: ["ui", "ux", "юай", "юикс"],
  type: "Design"
}

module.exports = questions_dict;