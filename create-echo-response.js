const { pick } = require('ramda')

// module.exports = ({ request, session, version}) => ({
//   response: {
//     text: request['original_utterance'],
//     tts: request['original_utterance'],
//     end_session: false,
//   },
//   session: pick(['session_id', 'message_id', 'user_id'], session),
//   version,
// })


function response_func({ request, session, version}) {

  let text_request = ""
  let tts_request = ""

  console.log(request['original_utterance'])

  if (request['original_utterance'].toLowerCase().includes("wild wolves вездекод") || request['original_utterance'].toLowerCase().includes("wild wolves вездеход")) {
    text_request = "Привет вездекодерам!"
    tts_request = "Привет вездекодерам!"
  }
  else {
      text_request = "Пожайлуста повторите!"
      tts_request = "Пожайлуста повторите!"
  }

  return {
  response: {
    text: text_request,
    tts: tts_request,
    end_session: false,
  },
  session: pick(['session_id', 'message_id', 'user_id'], session),
  version,
}
}

module.exports = response_func