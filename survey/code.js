{
  template: `{TEMPLATE}`,
  data: () => { return {
    translations: {
      {TRANSLATIONS}
    },
    uuid: null,
    currentTab: 0,
    answers: {
      answerFinal: null,
      emotions: {
        selected: [],
        selected_idk: [],
      },
      /* Leyla's deletions 
      roles: {
        selected: [],
        selected_idk: false,
        selected_wop_toggle: false,
        selected_wop_text: null,
        selected_other_toggle: false,
        selected_other_text: null,
      },
      relations: {
        selected: [],
        selected_idk: false,
        selected_other_toggle: false,
        selected_other_text: null,
      },*/
      feedback_optional: null,
      uuid: null,
    },
    sociolinguistic: {
      page: 0,
      answers: [],
      answers_checkbox: [],
      answer_email: null
    },
    showAlert: false,
  }
  },

  methods: {
	submit: function(){
    this.isFormValid()?(
      this.answers.sociolinguistic_questions = this.sociolinguistic.answers,
      this.answers.sociolinguistic_checkbox = this.sociolinguistic.answers_checkbox,
      this.answers.email = this.sociolinguistic.answer_email,
      this.pybossa.saveTask(this.answers),
      this.showAlert=!1,
      this.resetPage()): 
    this.showAlert=!0
  },
	skip: function(){
    this.pybossa.skip()
  },
	isFormValid: function(){
    switch(this.currentTab) {
      case 3:
        if (!((this.answers.relations.selected && this.answers.relations.selected.length!=0) || this.answers.relations.selected_idk || this.answers.relations.selected_other_toggle)) {
          return 0;
        }
      case 2:
        if (!(this.answers.emotions.selected[1] || this.answers.emotions.selected_idk[1])) {
          return 0;
        }
      case 1:
        if (!(this.answers.emotions.selected[0] || this.answers.emotions.selected_idk[0])) {
          return 0;
        }
      case 0:
        if (!((this.answers.roles.selected && this.answers.roles.selected.length!=0) || this.answers.roles.selected_idk || this.answers.roles.selected_other_toggle || this.answers.roles.selected_wop_toggle)) {
          return 0;
        }
    }
    return 1;
  },
  /* Leyla's deletions 
  next: function(){
    this.isFormValid()?(
      this.currentTab = this.currentTab + 1,
      this.showAlert=!1): 
    this.showAlert=!0;
  },
  prev: function(){
    this.currentTab = this.currentTab - 1;
    this.showAlert=!1;
  },*/
  resetPage: function() {
    this.currentTab = 0;
    this.answers = {
      answerFinal: null,
      emotions: {
        selected: [],
        selected_idk: [],
      },
      /* Leyla's deletions 
      roles: {
        selected: [],
        selected_idk: false,
        selected_wop_toggle: false,
        selected_wop_text: null,
        selected_other_toggle: false,
        selected_other_text: null,
      },
      relations: {
        selected: [],
        selected_idk: false,
        selected_other_toggle: false,
        selected_other_text: null,
      },*/
      feedback_optional: null,
      uuid: this.uuid,
    };

    var e=this;
    this.questions_emotions.forEach(function(){return e.answers.emotions.selected.push(null)});
    this.questions_emotions.forEach(function(){return e.answers.emotions.selected_idk.push(false)});
  },
  createUUID: function() {
    return 'xxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  modalPageNext: function() {
    this.sociolinguistic.page = this.sociolinguistic.page + 1;
    document.getElementsByClassName("d-block")[0].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  },

  },

  computed: {
    task: function(){return this.pybossa.task},
    taskInfo: function(){return this.task.info},
  },

  watch: {
  },

  created: function(){
    const style = document.createElement('style');
    style.innerHTML = `
      .step {
        height: 15px;
        width: 15px;
        margin: 15px 2px;
        background-color: #bbbbbb;
        border: none;
        border-radius: 50%;
        display: inline-block;
        opacity: 0.5;
      }
      .step.active {
        opacity: 1;
      }
      .step.finish {
        background-color: #4CAF50;
      }
    `;
    document.head.appendChild(style);
    this.uuid = this.createUUID();

    this.text = this.translations.{LANGUAGE};
    this.questions_emotions = [
      {
        question: this.text.question_3,
        answers: [
          { text: this.text.emotionality_2, value: 2 },
          { text: this.text.emotionality_3, value: 3 },
          { text: this.text.emotionality_4, value: 4 },
          { text: this.text.emotionality_5, value: 5 },
          { text: this.text.emotionality_6, value: 6 }
        ],
      },
      {
        question: this.text.question_2,
        answers:[
          { text: this.text.intensity_2, value: 2 },
          { text: this.text.intensity_3, value: 3 },
          { text: this.text.intensity_4, value: 4 },
          { text: this.text.intensity_5, value: 5 },
          { text: this.text.intensity_6, value: 6 }
        ]
      }
    ];
   /* Leyla's deletions 
   this.question_roles =
    {
      question: this.text.question_1,
      answers: [this.text.question_1_answer_1, 
                this.text.question_1_answer_2],
    };
   this.question_relations =
    {
      question: this.text.question_4,
      answers: [
                this.text.question_4_answer_2,
                this.text.question_4_answer_3,
                this.text.question_4_answer_4,
                this.text.question_4_answer_5,
                this.text.question_4_answer_6,
                this.text.question_4_answer_7
              ],
    };*/
    this.sociolinguistic_questions = [
      {
        question: this.text.soc_question_gender,
        answers: [
          this.text.soc_question_gender_answer_1,
          this.text.soc_question_gender_answer_2,
          this.text.soc_question_gender_answer_3,
        ],
      },
      {
        question: this.text.soc_question_age,
        answers: [
            this.text.soc_question_age_answer_1,
            this.text.soc_question_age_answer_2,
            this.text.soc_question_age_answer_3,
            this.text.soc_question_age_answer_4,
            this.text.soc_question_age_answer_5,
            this.text.soc_question_age_answer_6,
            this.text.soc_question_age_answer_7,
        ],
      },
      {
        question: this.text.soc_question_area,
        answers: [
          this.text.soc_question_area_answer_1,
          this.text.soc_question_area_answer_2,
          this.text.soc_question_area_answer_3,
          this.text.soc_question_area_answer_4,
          this.text.soc_question_area_answer_5,
          this.text.soc_question_area_answer_6,
          this.text.soc_question_area_answer_7,
          this.text.soc_question_area_answer_8,
        ]
      },
      {
        question: this.text.soc_question_lifetime,
        answers: [
          this.text.soc_question_lifetime_answer_1,
          this.text.soc_question_lifetime_answer_2,
          this.text.soc_question_lifetime_answer_3,
          this.text.soc_question_lifetime_answer_4,
          this.text.soc_question_lifetime_answer_5,
          this.text.soc_question_lifetime_answer_6,
        ],
      },
      {
        question: this.text.soc_question_education,
        answers: [
          this.text.soc_question_education_answer_1,
          this.text.soc_question_education_answer_2,
          this.text.soc_question_education_answer_3,
          this.text.soc_question_education_answer_4,
          this.text.soc_question_education_answer_5,
          this.text.soc_question_education_answer_6,
          this.text.soc_question_education_answer_7,
        ],
      },
      {
        question: this.text.soc_question_mobile,
        answers: [
          this.text.soc_question_mobile_answer_1,
          this.text.soc_question_mobile_answer_2,
          this.text.soc_question_mobile_answer_3,
          this.text.soc_question_mobile_answer_4,
          this.text.soc_question_mobile_answer_5,
        ],
      },
      /*Leyla's deletions 
      {   
        question: this.text.soc_question_emojiuse,
        answers: [
          this.text.soc_question_emojiuse_answer_1,
          this.text.soc_question_emojiuse_answer_2,
          this.text.soc_question_emojiuse_answer_3,
          this.text.soc_question_emojiuse_answer_4,
          this.text.soc_question_emojiuse_answer_5,
        ],
      },
      {
        question: this.text.soc_question_mobileuse,
        answers: [
          this.text.soc_question_mobileuse_answer_1,
          this.text.soc_question_mobileuse_answer_2,
          this.text.soc_question_mobileuse_answer_3,
          this.text.soc_question_mobileuse_answer_4,
          this.text.soc_question_mobileuse_answer_5,
        ],
      },*/
    ];
    this.sociolinguistic_checkbox = [
      {
        question: this.text.soc_question_languages,
        answers: [
          this.text.soc_question_languages_answer_1,
          this.text.soc_question_languages_answer_2,
          this.text.soc_question_languages_answer_3,
          this.text.soc_question_languages_answer_3_5,
          this.text.soc_question_languages_answer_4,
          this.text.soc_question_languages_answer_5,
          this.text.soc_question_languages_answer_6,
          this.text.soc_question_languages_answer_7,
          this.text.soc_question_languages_answer_8,
          this.text.soc_question_languages_answer_9,
          this.text.soc_question_languages_answer_10,
          this.text.soc_question_languages_answer_11,
        ],
      },
      {
        question: this.text.soc_question_platforms,
        answers: [
          this.text.soc_question_platforms_answer_1,
          this.text.soc_question_platforms_answer_2,
          this.text.soc_question_platforms_answer_3,
          this.text.soc_question_platforms_answer_4,
          this.text.soc_question_platforms_answer_5,
          this.text.soc_question_platforms_answer_6,
          this.text.soc_question_platforms_answer_7,
          this.text.soc_question_platforms_answer_8,
          this.text.soc_question_platforms_answer_9,
          this.text.soc_question_platforms_answer_10,
          this.text.soc_question_platforms_answer_11,
        ],
      },
    ];
  },

  mounted: function(){
    this.pybossa.run();
    this.resetPage();

    var e=this;
    this.sociolinguistic_questions.forEach(function(){return e.sociolinguistic.answers.push(null)});
    this.sociolinguistic_checkbox.forEach(function(){return e.sociolinguistic.answers_checkbox.push([])});

    this.$bvModal.show('bv-modal-presurvey');
  },

  props: {"pybossa":{"required":true}},
}