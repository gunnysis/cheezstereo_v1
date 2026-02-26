import type { Album, CatalogVideo } from '../types/catalog';

export const ALBUMS: Album[] = [
  {
    id: 'dwbh',
    title: "Don't Work Be Happy!",
    year: 2009,
    type: 'album',
    coverColor: '#1a1a2e',
    tracks: [
      { id: 'dwbh-1',  title: 'Hello',                              youtubeId: 'SZGYCDFhLRE', lyrics: `해질녘 낯선 밤거리를 걷고 있지만\n처음 본 것 같지만은 않아\n언제나 내가 방황해 온 바로 그 길이야\n돌고 또 돌고 도는 세상\n\nHello Hello Yeah\nHello Hello Yeah\n\nHard day, lonely night, hard day.\nLonely night, hard day.\n\n주위를 둘러 보면 춤추는 사람들\n자욱한 연기 속에 웃음\n이젠 분노도 없어 돌고 또 돌아왔지\n놀고 또 놀아 왔지 이젠\n\nHello Hello Yeah\nHello Hello Yeah\n\nHard day, lonely night, hard day.\nLonely night, hard day.` },
      { id: 'dwbh-2',  title: 'The Good, The Bad and The President', youtubeId: 'QarvLnUlqW0', lyrics: `무엇이 옳은지 무엇이 그른지\n이제는 나도 정말 헷갈리잖아\n누가 좋은 건지 누가 나쁜 건지\n이제는 나도 정말 모르겠어\n\n오 노 오 노 노노 노노노노\n\n조지 오웰의 소설 같은 세상\n빅 브라더가 지배하는 세상\n나폴레옹도 복서도 웃을 수 없는\n모든 것을 잃어만 가는 상실의 시대\n\n더 굳 더 배드 앤 더 프레지던트\n\n왼쪽으로 가던 오른쪽으로 가던\n이제는 나완 정말 상관없잖아\n하고 싶은 일도 해야 하는 일도\n이제는 할 수 없는 세상이잖아\n\n오 노 오 노 노노 노노노노` },
      { id: 'dwbh-3',  title: '난 어떡하라고',                       youtubeId: 'eeDwfm1GSfY', lyrics: `난 어떡하라고 난 어떡하라고 난 어떡하라고\n그렇게 나를 떠났니\n\n넌 괜찮니 넌 괜찮니 넌 괜찮니 넌 괜찮니\n날 떠나고도 괜찮니\n\n난 어쩌라고 난 어쩌라고 난 어쩌라고 난 어쩌라고\n날 떠나간 거니\n\n날 두고 떠나버린 그대여\n발병이나 나라` },
      { id: 'dwbh-4',  title: '동물해방전선',                         youtubeId: 'xIzXlo04SxE', lyrics: `끝없이 펼쳐진 푸른 초원 위를\n마음껏 달리고 싶어\n붉게 번지는 태양을 등에 지고\n호수의 물을 마시고 싶어\n\n커다란 배에 실려 멀고 먼 바다를 건너\n콘크리트 감옥 동물원에 왔어\n북극곰이 여기 여름이 너무 더워 미쳤어\n기린은 아프리카의 아이들이 보고 싶어` },
      { id: 'dwbh-5',  title: '순서에 상관없이',                      youtubeId: 'mmxn7A47alI', lyrics: `One two three four\n이것저것 다 좋아 너도 좋아 모두 다 좋아\n그런 표정으로 바라보는 것 좋아\n그런 목소리로 말하는 것 좋아\n\nI love you. I hate you. So so.\n\n그저 그래 모두 다 그저 그래 너도 그저 그래\n모두 다 그저 그래\n그런 표정으로 놀리지 말아줘\n그런 목소리로 말하지 말아줘\n\nOne two three four\n너도 싫어 모두 다 싫어\n그런 목소리로 놀리지 말아줘\n\nI love you. I hate you. So so.` },
      { id: 'dwbh-6',  title: 'Oh Yeah!',                           youtubeId: 'FnuTzUBh83U', lyrics: `Oh Yeah\nDon't stop, never give up\nOh Yeah\nDon't stop, never give up\nOh Yeah\n\nOh yeah, oh yeah, oh yeah, oh yea\n\n모든 것은 사라져 가네\n가네 가네 가네 가네\n모든 것은 잊혀져가네\n가네 가네 가네 가네\n모든 것은 소멸해 가네\n가네 가네 가네 가네\n영원한 것은 하나 뿐이네` },
      { id: 'dwbh-7',  title: '탁월한 선택',                          youtubeId: 'LZUuZLsp4yI', lyrics: `최고의 선택을 했어.\n후회는 없을 거야.\n모두가 만족을 했어. 믿을 수 있을 거야.\n어수룩한 새벽에도 검은 안경을 끼고\n다른 이에 이끌려 길 위로 나서지\n모두가 원하는 곳으로\n모두가 바라는 그곳으로\n그게 너의 베스트 초이스\n그게 바로 베스트셀러\n누군가의 흔적 위에\n너의 발자국을 따라 남기고\n뜨겁게 달아오른 검은 아스팔트 위의 여행길\n\n최고의 만족을 했어. 실망치 않을 거야.\n모두가 순응을 했어. 뒤쳐지지 않을 거야.\n밝은 태양 아래서도 은하수를 찾아서\n다른 이의 손을 잡고 길 위로 나서지.\n모두가 원하는 곳으로.\n모두가 바라는 그 곳으로.\n그게 너의 베스트 초이스\n그게 바로 베스트셀러\n누군가의 흔적 위에\n너의 발자국을 따라 남기고\n뜨겁게 달아오른 검은 아스팔트 위의 여행길` },
      { id: 'dwbh-8',  title: '산울림처럼 렛츠록',                    youtubeId: 'ZAoo1yv0124', lyrics: `서울, 답답하고 재미없는 도시에 태어났지만\n덕분에 난 정말 멋진 산울림의 음악을 알게 됐네\n아름답게 타오르는 석양을 바라보다가 그만\n인파에 떠밀려 메마른 횡단보도를 건넜네.\n\n더 이상 이건 아니다라고 내 삶에 커다랗게\n외쳐대고 있었지만 표정 없는 인파 속에 섞여 버스에 탔네\n몸을 가누기조차 힘든 이곳에서 거칠게 지쳐가는\n삶 속에서도 괜찮아 산울림의 음악이 있으니까\n\n마음이 허전하고 답답한 현실 속에\n산울림의 노래가 힘이 되어주네\n산울림처럼 렛츠록. 산울림처럼 렛츠록.` },
      { id: 'dwbh-9',  title: '한밤의 에스프레소',                    youtubeId: '5EPS1rNAoeU', lyrics: `잠이 오지 않는 밤에 밤에 밤에\n니 생각에 뒤척이는 밤에 밤에 밤에\n어둠이 내려앉은 내 방에 방에 방에\n\n한밤에 에스프레소\n한잔의 에스프레소` },
      { id: 'dwbh-10', title: 'Last Century Boys',                  youtubeId: 'x_Wn0__QIVI', lyrics: `여기 우리 모두 노래해 노래해\n지구에 어둠이 내려도 노래할 수 있어\n사랑이 떠나가도 노래할 수 있어\n희망만 가지고 있다면\n\n세상이 끝나는 날에도 누군가는 사과나무를 심듯\n누군가는 노래를 하겠지\n애타는 이 내 마음 그 누구가 알까\n우리는 라스트 센츄리 보이스\n\n난 몰랐네 난 몰랐었네 여기가 마지막일 줄은\n난 몰랐네 난 몰랐었네 우리가 라스트 센츄리 보이스` },
      { id: 'dwbh-11', title: '파티엔 언제나 마지막 음악이 필요하다',  youtubeId: 'FfpWn-gEYVw', lyrics: `춤추다 지쳤나요 스텝을 멈추지는 말아요\n아직 마지막 노래가 남았거든요\n스텝을 멈추지 말고 파티의 마지막 노래를 들어주세요\n\n언제나 그런 순간은 찾아오지요\n그대가 원하던 원치 않던\n\n내가 준비한 파티는 여기까지예요\n이젠 마지막 노래가\n파티에는 언제나 마지막 노래가 필요하죠\n\n걷다가 지쳤나요 걸음을 멈추지는 말아요\n아직 가지 않은 곳이 남았거든요\n걸음을 멈추지 말고 아직 남아있는 풍경을 즐겨주세요\n\n언제나 그런 순간은 찾아오지요\n그대가 원하던 원치 않던\n\n내가 준비한 파티는 여기까지예요\n이젠 마지막 노래가\n파티에는 언제나 마지막 노래가 필요하죠\nGo` },
    ],
  },
  {
    id: 'rfm',
    title: '화성로맨스',
    year: 2011,
    type: 'single',
    coverColor: '#c1121f',
    tracks: [
      { id: 'rfm-1', title: '화성로맨스', youtubeId: '9ZmwKDr61ko', lyrics: `언젠가 화성의 하늘의 하늘이\n푸르다는게 밝혀지면\n나에게 거짓말쟁이라 부르지 말아주세요\n서투른 나의 감정을 앞세워 당신에게\n사랑한다 말한것이 상처가 됐다면\n\n미안해요 하지만 그건 거짓이 아니었어요\n지금 내가 바라보는 사진속 화성의 하늘은\n오렌지 빛이지만\n결국 화성의 하늘은 푸르다는 진실을 알게되겠죠\n그땐 내 마음을 믿어줘\n\n진실이란 결국 믿음의 문제니까요\n진실은 저 너머에 잡히지 않는 무지개일까요\n저 너머에 사랑한다는 말이 거짓일순 없죠\n이세상 모든 말이 거짓일지라도\n\n사랑한다는 말이 거짓일순 없죠\n이 세상 모든 말이 거짓일지라도\n내가 믿고 싶은 하나까지\n내게 사랑한다 말해줘요\n내가 믿고 싶은 말이에요\n\n미안해요 하지만 그것은 거짓이 아니었어요\n지금 내가 바라보는 사진속 화성의 하늘은\n오렌지 빛이지만\n결국 화성의 하늘은 푸르다는 진실을\n그대는 믿게 되겠죠\n\n지금 내가 바라보는 사진속 화성의 하늘은\n오렌지 빛이지만\n결국 화성의 하늘은 푸르다는 진실을\n알게 되겠죠\n그땐 내 마음을 믿어줘요\n그땐 내 진심을 받아줘요` },
    ],
  },
  {
    id: 'twonights',
    title: 'TWO NIGHTs',
    year: 2012,
    type: 'single',
    coverColor: '#264653',
    tracks: [
      { id: 'twonights-1', title: '패션피플', youtubeId: 'OUz-lLRTDrE', lyrics: `여기를 봐도 저기를 봐도\n모두 멋쟁이 passion피플\n멋진 신발 비싼구두\n머리부터 발끝까지 fashion피플\n\n그어떤 조명보다도 화려하게\n그 누구보다도 더 멋지게\n반짝이는 불빛보다 더 빛나게\n차가운 도시남녀 fashion피플\n\n멋진 신발 비싼구두\n머리부터 발끝까지 fashion피플\n황홀한 눈빛 시크한\n마음 뼛속까지 passion피플\n\n그 어떤 조명보다도 화려하게\n그 누구보다도 더 멋지게\n반짝이는 불빛보다 더 빛나게\n차가운 도시남녀 fashion피플\n\n화려한 쇼윈도에 비친\nfashion피플 fashion피플` },
      { id: 'twonights-2', title: '오늘밤',   youtubeId: 'Bq6VmqrBQoU', lyrics: `아직도 어두운 밤이야\n모두가 쓸쓸함을 잊으려 애쓰는 시간\n그 모든 쓸데없는 걱정은 잊어\n아직은 포기 하기엔 이른 밤이야\n이른 밤이야 이른 밤이야.\n\nStay home together\nYou and me together\nNow and forever ever ever yeah\n\nStay home together\nYou and me together\nNow and forever ever ever yeah\n\n그 모든 걱정 따위 불안한 미래 따위\n모두 잊고 나와 함께 즐겨 오늘 밤을\n\nStay home together\nYou and me together\nNow and forever ever ever yeah\n\nStay home together\nYou and me together\nNow and forever ever ever yeah` },
    ],
  },
  {
    id: 'lm',
    title: 'Lonely Man',
    year: 2013,
    type: 'ep',
    coverColor: '#7209b7',
    tracks: [
      { id: 'lm-1', title: '불타는 내마음', youtubeId: '2NsUz4EIa00', lyrics: `그녀에게 불타는 내마음 전해줄꺼야\n흔들리는 마음을 확실히 잡아줄꺼야\n돌아서는 그대 마음 나에게 되돌릴꺼야\n\n그대 마음 그대로 내게 남아줄 수는 없는가\n그때처럼 그대도 나와 함께할 수는 없는가\n\n돌아서는 그대 미안해서 돌아올꺼야\n떠나가는 그대 미안해서 못떠날꺼야\n\n그녀에게 빠져든 내마음 고백할꺼야\n언젠가는 그대가 내마음 알아줄꺼야\n언제까지 내마음 감추고 싶진 않아\n\n그대 마음 그대로 내게 남아줄 수는 없는가\n그때처럼 그대도 나와 함께할 수는 없는가\n\n돌아서는 그대 미안해서 돌아올꺼야\n떠나가는 그대 미안해서 못떠날꺼야\n\n돌아서는 그대 미안해서 돌아올꺼야\n떠나가는 그대 미안해서 못떠날꺼야` },
      { id: 'lm-2', title: 'Dance Now',    youtubeId: 'Cll0IODwrTE', lyrics: `뒤돌아 후회해 봐도\n아무런 소용없다면\n멀지 않은 새벽을 향해\n우리 함께 지금 춤을 추자\n너의 느낌 그대로 리듬에 맞춰서\n지나간 시간은 등 뒤로\n보내고 지금을 춤추자\n너의 느낌 그대로 리듬에 맞춰서\n지나간 시간은 등 뒤로\n보내고 지금을 춤추자\n\n댄스 파티 투나잇\n댄스 파티 투나잇\n댄스 파티 투나잇\n댄스 파티 투나잇\n\n너의 느낌 그대로 리듬에 맞춰서\n지나간 시간은 등 뒤로\n보내고 지금을 춤추자` },
    ],
  },
  {
    id: 'wg',
    title: '왜 그래',
    year: 2015,
    type: 'ep',
    coverColor: '#e63946',
    tracks: [
      { id: 'wg-1', title: '왜 그래',      youtubeId: '26r3Gq7UC8Q', lyrics: `밤새워 달려온 길은 너무 어두워서\n너에게 보여 줄 수는 없는 걸까\n그렇게 보고 싶던\n네 모습이 자꾸 흐릿해져 가고\n지금 너를 잡고 싶어 하는\n내 손이 부끄러워서\n그렇게 모든 시간들이 점점 낡아 가네\n수없이 많은 순간들이 뒤로 흘러가네\n\n왜 그래 왜 자꾸 눈물이 날까요\n왜 그래 왜 이렇게 눈물만 날까요\n왜 그래\n\n지금껏 혼자 걸은 길은 너무 조용해서\n너에게 말해 줄 수는 없는 걸까\n그렇게 듣고 싶던\n네 목소리가 자꾸 멀어져 가고\n너를 지금 보고 싶어\n하는 내 마음이 부끄러워서\n\n그렇게 모든 시간들이 점점 낡아가네\n수없이 많은 순간들이 뒤로 흘러가네\n그렇게 모든 시간들이 점점 낡아가네\n수없이 많은 순간들이 뒤로 흘러가네\n\n왜 그래 왜 자꾸 눈물이 날까요\n왜 그래 왜 이렇게 눈물만 날까요\n왜 그래 왜 자꾸 눈물이 날까요\n왜 그래 왜 이렇게 눈물만 날까요` },
      { id: 'wg-2', title: '유유히 흐르네', youtubeId: 'sAk-5vFhky4', lyrics: `아직은 잘 모르겠지만 인생은\n바다를 향해 여행하는 흐르는 물 같아\n시간은 한 방향으로만 흐르는 물\n거스를 수 없기에 아래로 아래로\n하루는 짧고\n한 달은 너무나 길고도 길던 시절\n계곡을 흐르는 물처럼 뛰놀았네\n\n이제는 조금씩 유유히 흐르네\n유유히 흐르네\n유유히 흐르네\n유유히 흐르네\n\n점점 더 강폭은 넓어지고\n조금 흐른 것 같은데\n많이도 흘러 와 있네\n점점 더 강물은 깊어 가고\n조금 흐른 것 같은데\n\n다시 처음처럼 천천히 흐를 때쯤\n바다를 만나겠네\n점점 더 강폭은 넓어지고\n조금 흐른 것 같은데\n많이도 흘러 와 있네\n점점 더 강물은 깊어 가고\n조금 흐른 것 같은데\n\n다시 처음처럼 천천히 흐를 때쯤\n바다를 만나겠네\n\n원투쓰리 원투쓰리\n흘러가는 우리 인생사\n쿵짝짝 삼박자\n리듬 타고 우린 흐르네` },
      { id: 'wg-3', title: 'New',          youtubeId: '9WfDC5-oB2M', lyrics: `멀고 먼 길을 돌고 돌아\n남들보다 천천히\n언제나 나는 바보 같았고\n함께하는 사람에게도\n기다리는 사람에게도\n상처주며 스스로도 상처 입었어\n길고 긴 길을 돌고 돌아\n남들보다 느리게\n언제나 나는 어렸고\n성장이 멈춤 듯 답답했지\n오랜 시간 동안 성장통에\n아파하며 스스로\n정체에 의문스러워\n\n하루하루 나에게 던진\n의문들이 쌓여만 가고\n해답들은 하루하루만큼\n멀어져만 가는듯해\n여기가 어디고\n나는 누군지 모르는 것만큼\n지쳐가는 내 나이가 두려워서\n포기하고 싶을 때\n문득 뒤돌아보니\n포기 할 수 없을 만큼\n많이 온걸 깨달았어\n\n걱정하는 것만큼\n잘못되진 않았다고\n누군가 말해주면 좋겠어\n\n하루하루 나에게 던진\n의문들이 쌓여만 가고\n해답들은 하루하루만큼\n멀어져만 가는듯해\n여기가 어디고\n나는 누군지 모르는 것만큼\n지쳐가는 내 나이가 두려워서\n포기하고 싶을 때\n문득 뒤 돌아보니\n포기 할 수 없을 만큼 많이 온걸\n문득 뒤 돌아보니\n포기 할 수 없을 만큼\n많이 온걸 깨달았어` },
      { id: 'wg-4', title: '선샤인데이',    youtubeId: 'LIWBsM9Pw3s', lyrics: `햇살이 비추고 바람은 춤추고\n어제완 다른 너와의 오늘이\n시작되려 하고 있어\n서로에게 기대어 그토록 바라던\n오늘의 너와 나를\n언제나 잊지 말고 기억해\n\n비록 내일 일은 힘들더라도\n이젠 너와 함께 힘을 내야 해\n\n오 선샤인데이 오 뷰티풀데이\n\n비록 내일 일은 힘들더라도\n이젠 너와 함께 힘을 내야 해\n오늘의 너와 나를\n언제나 잊지 말고 기억해\n\n오 선샤인데이 오 뷰티풀데이\n\n오 반짝하고 해뜰 날 온단다\n눈부시도록 아름다운 날들이\n나에게로 너에게도 찾아온다` },
    ],
  },
  {
    id: 'tj',
    title: '여행의 시간 / Brink',
    year: 2017,
    type: 'ep',
    coverColor: '#2a9d8f',
    tracks: [
      { id: 'tj-1', title: '여행의 시간', youtubeId: 'XDAXAqfrrAE', lyrics: `이젠 지나 지나 지나 가버린 시간\n조금은 아쉽기도 하지만\n그렇게 그립기만 한 건 아니야\n아마도 그건 앞으로 너와 함께할 시간 때문일 거야\n\n여행은 언제나 아쉬운 마음으로 끝이 나지만\n그대와 함께라면 언제든지 설레이는 마음으로\n다시 떠날 수 있을 거예요\n\n우리의 여행\n우리의 일상\n우리 함께라면\n일상도 여행이죠\n\n아침 햇살 속에서 신문을 펼쳐보고\n오늘이 며칠인지를 알고\n우리가 함께하는 그 모든 순간들이\n너무나도 감사해\n\n우리의 여행\n우리의 일상\n우리 함께라면\n일상도 여행이죠` },
      { id: 'tj-2', title: 'Brink',       youtubeId: 'hxlM2_e3og8', lyrics: `왜 저녁 하늘은 저 새소리도\n여유롭게 내 마음을 몰라주는가\n너무나 아름답게 순식간에 타오르고\n어둠 속에 묻혀져 가네\n\n더 긴 이야기의 아주 일부분일 뿐이겠지만\n길고 긴 이야기의 아주 앞부분일 뿐이겠지만\n\n왜 저녁 노을은 조급하게도\n붉히면서 뒤로 돌아 멀어지는가\n너무나 아름답게 별 그림자\n길어지면 그림처럼 묻혀져 가네\n\n여긴 어딘가의 작은 일부분일 뿐이겠지만\n저기 어딘가엔 아직 일부분이 남아 있겠지\n\n왜 어둠이 찾아오기 직전이 아름답고\n왜 태양이 떠오르기 직전이 어두울까\n왜 어둠이 찾아오기 직전이 아름답고\n왜 태양이 떠오르기 직전이 어두울까` },
    ],
  },
  {
    id: 'cca',
    title: 'Cosmic Comics Alarm',
    year: 2019,
    type: 'single',
    coverColor: '#4361ee',
    tracks: [
      { id: 'cca-1', title: 'Cosmic Comics Alarm', youtubeId: 'q9WZECfceCc', lyrics: `달아 달아 밝은달아 이태백이\n놀던 그 옛날부터 떠있던 달에\n로켓트를 타고 가도 4일이면\n도착하는 요즘시대에도\n저별을 따다준다는\n나의 약속은 지킬수 없는 약속이네\n한오백년 일이백년 살다보면\n과학이 발전해서 저 멀고먼 별을 향해서\n꿈을 향해 항해하듯 갈 수있을지도 몰라\n\n알람소리가 귓가에 맴돌때\n그대모습에 귓가에 입이 걸리네\n알람소리가 귓가에 맴돌때\n그대모습에 귓가에 입이 걸리네\n\n수많은 사람의 파도에 밀리고 밀려\n여기 하루의 끝에 다다랐네\n번쩍이는 광고속 멋진 사람들은\n이제부터 즐기라며 부추기지만\n하루하루 반복되네\n하루하루 반복되네\n\n알람소리가 귓가에 맴돌때\n그대모습에 귓가에 입이 걸리네\n알람소리가 귓가에 맴돌때\n그대모습에 귓가에 입이 걸리네` },
    ],
  },
];

export const VIDEOS: CatalogVideo[] = [
  // 뮤직비디오
  { id: 'Rc587Kr3gBs', title: '치즈스테레오 - Hello',                                      category: 'mv',        year: 2011 },
  { id: 'Z9NtXBWlcGU', title: '치즈스테레오 - 화성로맨스 M/V',                              category: 'mv',        year: 2011 },
  { id: 'OUz-lLRTDrE', title: '치즈스테레오 - 패션피플 M/V',                                category: 'mv',        year: 2012 },
  { id: 'Bq6VmqrBQoU', title: '치즈스테레오 - 오늘밤 M/V',                                  category: 'mv',        year: 2012 },
  { id: '2NsUz4EIa00', title: 'Cheezstereo - 불타는 내마음 (My Burning Heart)',             category: 'mv',        year: 2013 },
  { id: 'Cll0IODwrTE', title: 'Cheezstereo - Dance Now',                                  category: 'mv',        year: 2013 },
  { id: '26r3Gq7UC8Q', title: '[M/V] Cheezstereo - 왜 그래 (Why)',                        category: 'mv',        year: 2015 },
  { id: 'sAk-5vFhky4', title: '[M/V] 치즈스테레오 - 유유히 흐르네 (Like A Lazy River)',    category: 'mv',        year: 2015 },
  { id: 'XDAXAqfrrAE', title: '치즈스테레오 - 여행의 시간 [Lyric Video]',                   category: 'mv',        year: 2017 },
  { id: 'QVrCmYjP1y0', title: '치즈스테레오 - Dance Now [Official Audio]',                 category: 'mv',        year: 2019 },
  { id: 'q9WZECfceCc', title: 'Cosmic Comics Alarm',                                      category: 'mv',        year: 2019 },

  // 라이브
  { id: 'p1cXDEqlb-E', title: '치즈스테레오 - Yeah! 오예 [LIVE]',                          category: 'live',      year: 2014 },
  { id: 'cn0YIQPa49k', title: 'Sugar LIVE #5 : 치즈스테레오 - 한밤의 에스프레소',           category: 'live',      year: 2015 },
  { id: 'XbuJl4XV40c', title: '치즈스테레오 - 청춘파도 (클럽FF 라이브)',                     category: 'live',      year: 2015 },
  { id: '9fueW_KDFts', title: '치즈스테레오 - 화성로맨스 (클럽FF 라이브)',                   category: 'live',      year: 2015 },
  { id: '3CAoqazaig8', title: '치즈스테레오 - Eve (라이브)',                                category: 'live',      year: 2015 },
  { id: '71GmHx5x6Xo', title: '유유히 흐르네',                                             category: 'live',      year: 2015 },

  // 인터뷰
  { id: 'QTJXj9GCC2k', title: 'Cheezstereo (치즈스테레오) Interview @ Mirrorball',         category: 'interview', year: 2013 },
  { id: 'jt013pIODHE', title: '[오여홍2] 오여홍 늬우-스 ft. 치즈스테레오',                  category: 'interview', year: 2017 },
];
