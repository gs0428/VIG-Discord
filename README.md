# VIG

VIG 디스코드 채널에서 사용되는 봇을 만드는 레포지토리에요.

## 개요

VIG 디스코드 채널은 일주일에 한 번 글을 작성하여 글 쓰는 습관을 만들기 위해 만들어진 스터디 채널이에요.

작성한 블로그 url을 디스코드 봇에 제출하여 블로그 작성을 인증하고 공유해요.

## 계기

매주 월요일마다 지난 주에 블로그 글을 작성하지 않은 인원에게 패널티를 부여하게 되는데, **"이 과정을 자동화하면 어떨까?"** 하는 생각에 만들게 되었어요.

## 기능

현재(2024.09.15)까지 만들어진 기능은 아래와 같아요.

### commands

- /submit <span style="color:grey;">url</span>
  - url(필수): 제출할 블로그의 url

## 기술

- [discord.js](https://discord.js.org/): 디스코드 봇의 커맨드를 생성하고 데이터 처리를 하는데 사용했어요.
- [NAVER CLOUD PLATFORM](https://www.ncloud.com/): 디스코드 봇을 실행시켜둘 서버를 만드는데 사용했어요.
- [Google Sheets](https://developers.google.com/sheets/api/guides/concepts?hl=ko): 패널티와 같은 데이터 관리를 위해 위해 사용했어요.
