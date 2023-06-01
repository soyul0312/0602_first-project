// [ 부트캠프_3주차_개인 프로젝트 ]  
// " https://api.themoviedb.org " API에서 영화 데이터를 가져와 웹 페이지에 표시하기
// => 영화 데이터를 가져와 배열에 저장하고 웹 페이지에서 영화를 검색하고 표시하는 기능을 제작해보는 프로젝트

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTg0ODgxMmFlZGVjOTk2MWVmZDFkNTQwZTBkMTZmYSIsInN1YiI6IjY0NzU1YjllOTYzODY0MDEzNTNmYTczYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lLECj_6Yf35Yxs-8f-gVhCWKcdyIrN8Fj69MQbPomdE",
  },
};

  
let originalMoviesData = [];
// 가져온 영화 데이터를 저장할 빈 배열의 'originalMoviesData' 변수 추가


fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((data) => data.json())
  .then((data) => {
    originalMoviesData = data.results; // 원본 영화 데이터 저장

    displayMovies(originalMoviesData); // 처음에 모든 영화 표시
  })
  .catch((err) => console.error(err));
  // 두 번째 then()콜백에서는 추출된 데이터가 배열에 할당됩니다 originalMoviesData. 
  // 이 배열은 나중에 사용할 수 있도록 동영상 결과를 저장합니다.
  // 함수 displayMovies()가 호출되어 originalMoviesData배열을 인수로 전달합니다. 
  // 이 기능은 웹 페이지에서 동영상 데이터를 렌더링합니다.
  // API 요청 또는 응답 처리 중에 오류가 발생하면 catch()콜백이 오류를 콘솔에 기록합니다.


function displayMovies(movies) {
  document.querySelector("#cards").innerHTML = "";
  // 기존 영화 카드 지우기
  // 이 displayMovies()함수는 영화 배열을 입력으로 받아 웹 페이지에 렌더링합니다. 
  // ID가 ​​"cards"인 요소 내부 HTML의 콘텐츠를 지우는 것으로 시작합니다.

  movies.forEach((row) => {
    let title = row.original_title;
    let overview = row.overview;
    let poster = row.poster_path;
    let vote = row.vote_average;
    let id = row.id;

    let temp_html = `<div class = "movie-card" , onclick = "alert('영화 ID: ${id}')">
                      <img src = "https://image.tmdb.org/t/p/w500${poster}" 
                      alt = "" />
                      <h3>${title}</h3>
                      <p class = voteFont>${vote}</p>
                      <p>${overview}</p>
                    </div>`;
    document.querySelector("#cards").innerHTML += temp_html;
  });
} 
// 추출된 영화 정보를 템플릿에 보간하여 템플릿 문자열을 사용하여 각 영화에 대한 HTML 코드를 생성합니다. 
// 생성된 HTML에는 onclick영화 카드를 클릭할 때 영화 ID와 함께 경고를 표시하는 이벤트가 포함되어 있습니다.

function handleSearch(event) {
  event.preventDefault(); 
  // handleSearch(){} : 검색 이벤트를 처리하는 함수
  // preventDefault() : 폼 제출 시 페이지가 새로고침되는 것을 방지

  let searchInput = document.getElementById("search-input").value;
  // "search-input"의 검색 입력 필드의 값을 가져와서 searchInput에 저장합니다.

  let filteredMovies = originalMoviesData.filter((movie) => {
    return movie.original_title.toLowerCase().includes(searchInput.toLowerCase());
  }); 
  // 검색 입력을 기준으로 영화 필터링
  // toLowerCase() : 소문자로 변경
  // 'originalMoviesData' 원래 제목이 검색 입력과 일치하는 영화를 찾기 위해 배열을 필터링합니다 (대소문자 구분 안 함). 
  // 필터링된 동영상은 배열에 저장됩니다 filteredMovies.

  displayMovies(filteredMovies);
  // 함수 displayMovies()가 다시 호출되며 이번에는 filteredMovies배열을 인수로 전달합니다. 
  // 이렇게 하면 필터링된 결과만 표시하도록 웹 페이지에 표시된 동영상이 업데이트됩니다.
}


