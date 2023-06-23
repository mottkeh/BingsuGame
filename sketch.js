// 레이아웃 불러오기
function preload() {
  bg_layer = loadImage('img/gbl.png');
  bg_img = loadImage('img/bg.jpg');
  customer_img1 = loadImage('img/cust.png');
  bubble = loadImage('img/bubble.png');

  //재료 이미지 불러오기
  blueberry = loadImage('img/blueberry.png')
  yunyu = loadImage('img/yunyu.png')
  redbean= loadImage('img/redbean.png')
  injulmi = loadImage('img/injulmi.png')
  mango = loadImage('img/mango.png')
  plate = loadImage('img/plate.png')
  ice = loadImage('img/ice.png')
}

function draw() {
  background(bg_img);
  image(bg_img, 0, 0);
  image(customer_img1, 900, 400, 800, 600);
  image(bg_layer, 0, 0);
  image(bubble, 150, 350);
  
}


// 빙수 메뉴의 레시피
let result;
const recipes = {
  '인절미 빙수': {
    얼음: 1,
    인절미: 1
  },
  '팥인절미 빙수': {
    얼음: 1,
    인절미: 1,
    팥: 1
  },
  '망고 빙수': {
    얼음: 1,
    망고: 1,
    연유: 1
  },
  '블루베리 빙수': {
    얼음: 1,
    블루베리: 1,
    연유: 1
  }
};

// 게임 클래스
class BingsooGame {
  constructor() {
    this.ingredients = {
      얼음: 0,
      인절미: 0,
      팥: 0,
      망고: 0,
      블루베리: 0,
      연유: 0
    };
    this.currentOrder = null;
    this.orderCompleted = false;
  }

  // 게임 초기화
  setup() {
    createCanvas(800, 600);
    textSize(18);
    textAlign(CENTER, CENTER);
    this.resetOrder();
    this.displayButtons();
    this.displayOrder();
  }

  // 버튼과 완료 버튼을 화면에 표시
  displayButtons() {
    let x = width / 2;
    let y = height * 0.5;
    const buttonWidth = 60;
    const buttonHeight = 30; //버튼마다 이미지를 넣으려면 어떻게..

    for (const ingredient in this.ingredients) {
      const button = createButton(ingredient);
      button.style('background-image', 'url("closeup-shot-one-ginger-cat-hugging-licking-other-isolated-white-wall_181624-32893.jpg.avif")'); // 이미지 파일 경로
      button.style('background-size', 'cover'); // 배경 이미지 크기를 버튼에 맞게 조절

      button.position(x, y);
      button.size(buttonWidth, buttonHeight);
      button.mousePressed(() => this.incrementIngredient(ingredient));
      x += buttonWidth + 10;
    }

    const completeButton = createButton('완료');
    completeButton.position(x, y);
    completeButton.size(buttonWidth, buttonHeight);
    completeButton.mousePressed(() => this.completeOrder());
  }

  // 주문을 화면에 표시
  displayOrder() {
    background(255); // 화면 초기화

    const x = width / 2;
    const y = height * 0.1;
    let orderText;

    if (this.orderCompleted) {
      this.resetOrder();
      return;
    } else {
      if (!this.currentOrder) {
        this.currentOrder = random(Object.keys(recipes));
        this.displayButtons();
      }
      orderText = `${this.currentOrder} 주세요.`;
    }

    textSize(18);
    text(orderText, x, y);

    // 재료 개수 표시
    let yPos = y + 30;
    for (const ingredient in this.ingredients) {
      const ingredientText = `${ingredient}: ${this.ingredients[ingredient]}개`;
      text(ingredientText, x, yPos);
      yPos += 20;
    }
  }

  // 재료 개수 증가
  incrementIngredient(ingredient) {
    if (!this.orderCompleted && this.currentOrder) {
      if (ingredient) {
        this.ingredients[ingredient]++;
        this.displayOrder();
      }
    }
  }

  // 완료 버튼 클릭 시 주문 완료 처리
  completeOrder() {
    if (!this.orderCompleted && this.currentOrder) {
      const orderCorrect = this.checkOrder();
      this.displayResult(orderCorrect);
      this.orderCompleted = true;
      this.displayOrder();
    }
  }

  // 주문과 레시피 비교
  checkOrder() {
    const orderIngredients = recipes[this.currentOrder];
    for (const ingredient in orderIngredients) {
      if (orderIngredients[ingredient] !== this.ingredients[ingredient]) {
        return false;
      }
    }
    return true;
  }

  // 결과 출력
  displayResult(correct) {
    let result;
    if (correct) {
      const compliments = ['맛있네요', '감사합니다', '수고하세요'];
      result = random(compliments);
    } else {
      const criticisms = ['이게 아닌데...', '장사를 뭐 이렇게 해?', '리뷰 1점 남길 거에요'];
      result = random(criticisms);
    }
    alert(result);
    console.log(result);
    // this.displayGameOverScreen(result);
  }

  // 주문 초기화
  resetOrder() {
    this.ingredients = {
      얼음: 0,
      인절미: 0,
      팥: 0,
      망고: 0,
      블루베리: 0,
      연유: 0
    };
    this.currentOrder = null;
    this.orderCompleted = false;
    this.displayOrder();
  }
}

// 게임 인스턴스 생성
const game = new BingsooGame();

// p5.js 초기 설정
function setup() {
  game.setup();
}
