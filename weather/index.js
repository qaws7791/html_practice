const serviceKey =
  "76zDuaNaxv5VU7qatyG3Up%2Bs%2F0G3RJPdMO7wuxSLcpiLRYf8fWpNLrXuPv5Y4BCFBdI4empp0S1Vzpr778JznA%3D%3D";

let numOfRows = "12"; // 한 페이지 결과 수
let pageNo = "1"; // 페이지 번호
let dataType = "JSON"; // 요청자료형식
let base_date = "20220810"; // 발표일자
let base_time = "2300"; // 발표시각
let nx = "10"; // X좌표
let ny = "127"; // Y좌표
let url;

let element_temperate;
let element_probability;
let element_wind;
let element_img;
let element_date;

let array_code = {
  POP: { code: "POP", name: "강수확률", unit: "%" },
  PTY: { code: "PTY", name: "강수형태", unit: "코드값" },
  PCP: { code: "PCP", name: "1시간 강수량", unit: "범주 (1 mm)" },
  REH: { code: "REH", name: "습도", unit: "%" },
  SNO: { code: "SNO", name: "1시간 신적설", unit: "범주(1 cm)" },
  SKY: { code: "SKY", name: "하늘상태", unit: "코드값" },
  TMP: { code: "TMP", name: "1시간 기온", unit: "℃" },
  UUU: { code: "UUU", name: "풍속(동서성분)", unit: "m/s" },
  VVV: { code: "WSD", name: "풍속(남북성분)", unit: "m/s" },
  WAV: { code: "WAV", name: "파고", unit: "M" },
  VEC: { code: "VEC", name: "풍향", unit: "deg" },
  WSD: { code: "WSD", name: "풍속", unit: "m/s" },
};

function load() {
  element_temperate = document.getElementById("temperate");
  element_probability = document.getElementById("probability");
  element_wind = document.getElementById("wind");
  element_img = document.getElementById("weather_img");
  element_date = document.getElementById("date");

  navigator.geolocation.getCurrentPosition(success, error, options);
}

function conv_sky(sky_code) {
  let value = "day";
  switch (sky_code) {
    case "1": //맑음
      if (base_time > 1800) {
        value = "night";
      } else {
        value = "day";
      }
      break;
    case "3": //구름많음
      if (base_time > 1800) {
        value = "cloudy-night";
      } else {
        value = "cloudy-day";
      }
      break;
    case "4": //흐림
      value = "cloudy";
      break;
    default:
      value = "day";
  }
  return value;
}

function conv_pty(pty_code) {
  let value = "없음";
  switch (pty_code) {
    case "1": //비
      value = "rainy";
      break;
    case "2": //비/눈
      value = "rainy-snowy";
      break;
    case "3": //눈
      value = "snowy";
      break;
    case "4": //소나기
      value = "shower";
      break;
    case "5": //빗방울
      value = "raindrop";
      break;
    case "6": //빗방울/눈날림
    case "7": //눈날림
      value = "drifting-snow";
      break;
    default:
      value = "ERROR";
  }
  return value;
}

function loadDate() {
  let public_time = new Date();
  let current_time = new Date();
  let diffTime = 0;
  let month = public_time.getMonth();
  // 가장 최근의 base_date, base_time 구하기
  public_time.setHours(public_time.getHours() - 2);
  public_time.setMinutes(public_time.getMinutes() - 10);
  month = `${public_time.getMonth() + 1}`.padStart(2, "0");
  public_time.setHours(parseInt(public_time.getHours() / 3) * 3 + 2);
  public_time.setMinutes(10);
  base_date = `${public_time.getFullYear()}${month}${public_time.getDate()}`;
  base_time = public_time.getHours() * 100;
  base_time = base_time.toString().padStart(4, "0");

  console.log("public_time:" + public_time);
  console.log("current_time:" + current_time);

  //발표 시각과 현재 시간과의 차이를 구해 pageNo 구하기
  diffTime = (current_time.getTime() - public_time.getTime()) / 60000;
  if (diffTime < 50) pageNo = 1; //2310~2359
  else if (diffTime < 110) pageNo = 2; //00~0:59
  else if (diffTime < 170) pageNo = 3; //1:00~1:59
  else pageNo = 4;
  console.log("pageNo = " + pageNo);
  console.log("기준 시간: ", base_date, base_time);
}

function create_url() {
  return (
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?" +
    "serviceKey=" +
    serviceKey +
    "&numOfRows=" +
    numOfRows +
    "&pageNo=" +
    pageNo +
    "&dataType=" +
    dataType +
    "&base_date=" +
    base_date +
    "&base_time=" +
    base_time +
    "&nx=" +
    nx +
    "&ny=" +
    ny
  );
}

let result;

function load_api() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (parseInt(data.response.header.resultCode) > 0) {
        console.error(
          "ERROR: code: " +
            data.response.header.resultMsg +
            "(" +
            data.response.header.resultCode +
            ")"
        );
      }
      result = data.response.body.items.item;
      console.dir(result);
      for (const element of result) {
        let value;
        array_code[element.category].value = element.fcstValue;
      }
      console.table(array_code);
      draw();
    });
}

function draw() {
  element_temperate.innerText = array_code["TMP"].value;
  element_probability.innerText = array_code["POP"].value;
  element_wind.innerText = array_code["WSD"].value;
  let img_src = "./icons/";
  if (array_code["PTY"].value == "0") {
    img_src += conv_sky(array_code["SKY"].value) + ".svg";
  } else {
    img_src += conv_pty(array_code["PTY"].value) + ".svg";
  }
  element_img.src = img_src;
  element_date.innerText = base_date + " " + base_time.slice(0, -2) + "시";
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;
  let rs = dfs_xy_conv("toXY", crd.latitude, crd.longitude);
  nx = rs.x;
  ny = rs.y;
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  loadDate();
  url = create_url();
  load_api();
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
