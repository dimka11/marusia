const { pick } = require('ramda')
const questions = require('./questions.js')

// module.exports = ({ request, session, version}) => ({
//   response: {
//     text: request['original_utterance'],
//     tts: request['original_utterance'],
//     end_session: false,
//   },
//   session: pick(['session_id', 'message_id', 'user_id'], session),
//   version,
// })


function get_question(q_state) {
  return questions[q_state]
}

function end_game({ request, session, version, state}, session_st) {
  let ml_score = session_st.score_ML;
  let mobile_score = session_st.score_Mobile;
  let design_score = session_st.score_Design;

  let text_request = "";
  let tts_request = "";

  if (ml_score > 2) {
    text_request += "Вы хороши в МЛ \n"
    tts_request = text_request
  }
  if (mobile_score > 2) {
    text_request += "Вы хороши в Mobile \n"
    tts_request = text_request
  }
  if (design_score > 1) {
    text_request += "Вы хороши в Дизайне \n"
    tts_request = text_request
  }
  if (text_request == "") {
    text_request = "Вам нужно опдготовиться получше"
    tts_request = text_request
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


function response_func({ request, session, version, state}) {

  let text_request = "";
  let tts_request = "";
  let session_st = {};
  session_st = state.session;

  console.log(request['original_utterance'])
  console.log(state)


  if(state.session.game == true && state.session.q_state > 0){
    let q = get_question(state.session.q_state - 1);
    let answ = q.correct;
    let type = q.type;

    if (answ.includes(request['original_utterance'].toLowerCase().trim()) == true) {
        if (type == "Mobile"){
          session_st.score_Mobile = session_st.score_Mobile + 1;
        }
        if (type == "ML"){
          session_st.score_ML = session_st.score_ML + 1;
        }
        if (type == "Design"){
          session_st.score_Design = session_st.score_Design + 1;
        }
    }

    if (state.session.q_state >= 8) {
      return end_game({ request, session, version, state}, session_st)
    }
    else {
      q = get_question(state.session.q_state);
      text_request = q.q;
      tts_request =  q.q;
      session_st.q_state = session_st.q_state + 1;
      session_st.game = true;
    }
  }
  
  else if (request['original_utterance'].toLowerCase().includes("wild wolves вездекод") || request['original_utterance'].toLowerCase().includes("wild wolves вездеход")) {
    text_request = "Привет вездекодерам!"
    tts_request = "Привет вездекодерам!"
  }

  else if (request['original_utterance'].toLowerCase().includes("вопросы")){
    text_request = "ok, я буду задавать вопросы об ИТ! напиши да"
    tts_request = "ok, я буду задавать вопросы об Ай Ти! скажи да"

    session_st = {
      game: true,
      q_state: 0,
      score_Design:0,
      score_Mobile:0,
      score_ML:0,
    }
  }

  else if (request['original_utterance'].toLowerCase().includes("да") && state.session.game == true) {
    let q = get_question(state.session.q_state);
    text_request = q.q;
    tts_request =  q.q;
    session_st.q_state = session_st.q_state + 1;
    session_st.game = true;
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
  session_state: session_st
}
}

module.exports = response_func