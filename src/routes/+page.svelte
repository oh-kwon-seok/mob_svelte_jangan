

<script lang="ts">
	
	import { Button, Label, Input, Checkbox, Card, Spinner, Modal,Helper} from 'flowbite-svelte'
	import axios from 'axios'
	import Alert from '$lib/components/alert/Alert.svelte';
	import Loading from '$lib/components/button/Loading.svelte';
	
	import {LOGIN_ALERT} from '$lib/module/common/constants';
	import {passwordCheck} from '$lib/module/common/function';
	
	import src_url from '$lib/images/fruit.jpg';
	import {common_alert_state,login_state, load_state} from '$lib/store/common/state';

	import {onChangeHandler,loadChange,tokenChange} from '$lib/store/common/function';
	import { businessNumber,phoneNumber,generateRandomString} from '$lib/module/common/function';


	import { setCookie, getCookie, removeCookie } from '$lib/cookies';
	import naver from 'naver-id-login'

	import naver_login_button from '$lib/images/naver_login_white.png';


	import { onMount } from 'svelte';
	const api = import.meta.env.VITE_API_BASE_URL;

	const client_url = import.meta.env.VITE_CLIENT_BASE_URL;
	

	let open = false; // 비밀번호 찾기 상태

	let code = ""; // 비밀번호 찾기 상태
	let phone = ""; // 비밀번호 찾기 상태
	
	let autoSave : any = false; // 자동저장유무



// TextEncoder 인스턴스 생성
const textEncoder = new TextEncoder();

// 문자열을 Uint8Array로 변환
const uint8Array:any = textEncoder.encode(generateRandomString(32));

const binaryString = String.fromCharCode.apply(null, uint8Array);

// 문자열을 Base64로 인코딩
const naver_state = btoa(binaryString);

	let login_data : any;


	login_state.subscribe((data:any) => {
  		login_data = data;

	});



	const NaverClientId = import.meta.env.VITE_NAVER_CLIENT_ID

	
	//let kakaoClientId = '2713d0b777a1e2fbfaf1b0cd5aa224f4'; // 여기에 본인의 Kakao 클라이언트 ID를 입력하세요.
	let kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID; // 여기에 본인의 Kakao 클라이언트 ID를 입력하세요.
	
	



  	let kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${client_url}/home&response_type=code`;


	let authUrl : any;
	onMount(async () => {
		try {
		// 백엔드에서 네이버 로그인 URL을 가져오는 엔드포인트로 요청을 보냅니다.
		const response = await axios.get(`${api}/auth/naver_login`);
		authUrl = response.data.authUrl;
	
		} catch (error) {
	
		}
		const storedUsername = getCookie('my-cookie');
		const storedPassword = getCookie('password');
		const storedAutoSave = getCookie('autoSave');
		
	
		if(storedUsername){
			$login_state['id'] = storedUsername;
		}
		if(storedPassword){
			$login_state['password'] = storedPassword;
		}
		if(storedAutoSave){
			autoSave = storedAutoSave === 'true'; // 쿠키는 문자열로 저장되므로 boolean으로 변환
		}
	

  	});




	function onKakaoLogin() {
    	window.location.href = kakaoAuthURL;
  }

  function onNaverLogin() {

    	window.location.href = authUrl;
  }



	const login = (e : any) => {
	

		loadChange(true);
		$common_alert_state = {type : 'login', value : false};
		
		
		const url = `${api}/user/mobile-signin`
		try {
			// await performAsyncTask();

			let params = $login_state;
				const config = {
				headers:{
					"Content-Type": "application/json",
					
				}
			}


		axios.post(url,
			params,config
		).then(res => {
		

		
			if(res.data['success'] === true){
					// 	쿠키 설정
				setCookie('my-cookie', $login_state['id'], { expires: 21 * 24 * 60 * 60  });
				if(autoSave === true){
					setCookie('my-cookie', $login_state['id'], { expires: 21 * 24 * 60 * 60  });
					setCookie('password', $login_state['password'], { expires: 21 * 24 * 60 * 60  });
					setCookie('autoSave', autoSave, { expires: 21 * 24 * 60 * 60 }); // 21일 보관

				}
				
				login_state.update((currentState:any) => {
					const newState = { ...currentState, id: $login_state['id'],
					token : res.data['token'],
				};
					login_data = newState; // login_data에도 저장
					return newState; // 업데이트된 상태 반환
				});
				

				tokenChange(res.data['token']);


	
				window.location.href = '/home';
			
			}else if(res.data['success'] === false){
				
				console.log('document.body.scrollHeight : ', document.body.scrollHeight);
				
								
				$common_alert_state = {type : 'login', value : true};

				window.scrollTo({
					top: document.body.scrollHeight,
					behavior: 'smooth' // 부드러운 스크롤을 위해 'smooth' 옵션을 추가
					});
			}		
		}
			
	)
		
		}catch (e : any){
			alert(`다음과 같은 에러가 발생했습니다 : ${e.name} : ${e.message}`);
		} finally {
			loadChange(false);
			
		}


		login_data['id'] = $login_state['id'];
				login_state.update(() => login_data);
				

	}

	const performAsyncTask = () => {
    return new Promise((resolve : any, reject : any) => {
      // 비동기 작업을 수행하는 함수를 정의합니다.
      // 실제 작업을 수행하는 로직을 여기에 추가합니다.
      // 예시로 2초 후에 작업이 완료되었다고 가정합니다.
      setTimeout(() => {
        // 비동기 작업이 완료되면 resolve를 호출하여 성공을 알립니다.
        resolve();
        // 예시로 강제로 예외를 발생시킵니다.
        // reject(new Error("비동기 작업 중 예외 발생"));
      }, 2000);
    });
  }





	const passwordInitSend = () => {
	

	const url = `${api}/user/password_init`
	try {
		// await performAsyncTask();

		let params = { code : code, phone : phone} 

		console.log('params : ',params);
			const config = {
			headers:{
				"Content-Type": "application/json",
			}
		}
	axios.post(url,
		params,config
	).then(res => {
	

	
		if(res.data['success'] === true){
			
			alert('비밀번호가 초기화되었습니다.');			
			open = false;
		
		}else if(res.data['success'] === false){
			
			alert('입력하신 정보로 회원정보가 조회되지 않습니다.');			
			
			
		}		
	}
)
	
	}catch (e : any){
		alert(`다음과 같은 에러가 발생했습니다 : ${e.name} : ${e.message}`);
	} finally {
		
	}


	
			

	}
	
</script>

	<style>
		.image-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		width : 50%;
		margin: 5px;
	}
	</style>

		
	<Modal title={`비밀번호 초기화`}  bind:open={open} size="xl" placement={'center'}   class="w-full">
		
		<!-- grid grid-cols-2 gap-4 -->
	<form >
		

	<div class="grid grid-cols-1 gap-4">
		
	


		<Label class="space-y-2">
			<span>사업자번호 {businessNumber(code)}</span>
			<Input maxlength="11" type="text" placeholder="사업자번호를 입력하세요" required bind:value={code} />
		  </Label>




		<Label class="space-y-2">
			<span>연락처 {phoneNumber(phone)}</span>
			<Input maxlength="11" type="text" placeholder="연락처를 입력하세요" required bind:value={phone} />
		  </Label>

	


	
			<!-- 사업장 ID는 사업자등록번호로 연결시켜놓음 -->
			
			

		</div>
	


		<div class="grid grid-cols-6 gap-4">
		
		</div>
		

	


	</form>
	
	<Button   class="w-full" on:click={() => passwordInitSend()}>비밀번호 초기화 요청</Button>


</Modal>

		





		<div class="flex justify-center items-center ">
		<Card class="w-full "   img={src_url}   reverse={false} horizontal>	
		<form class="flex flex-col space-y-6" >
				<h3 class="text-xl font-medium text-gray-700 dark:text-white p-0 w-80">신선식품 유통서비스</h3>
				<Label class="space-y-2">
					<span>ID</span>
					<Input   type="text" name="id" placeholder="ID를 입력하세요" required bind:value={$login_state['id']} />
				</Label>
				<Label class="space-y-2 justify-center">
					<span>Password</span>
					<Input  type="password" name="password" placeholder="비밀번호를 입력하세요" required bind:value={$login_state['password']} />
				{#if $common_alert_state['type'] === 'login' && $common_alert_state['value'] === true}
					{#if  $login_state['password'] !== '' && passwordCheck($login_state['password']) === false}
					<Helper class='mt-2' color='red'><span class="font-medium">비밀번호는 숫자,문자,특수문자포함 8글자 이상이어야 합니다.</span></Helper>
					{/if}
				{/if}
				</Label>
				<div class="flex items-start">
					<Checkbox bind:checked={autoSave}>자동 저장</Checkbox>
					
				</div>
				{#if $load_state === false}
					<Button  type="submit" class="w-full" on:click={(e) => login(e)} >로그인</Button>
				{:else if $load_state === true}
					<Loading />
				{/if}


				{#if $common_alert_state['type'] === 'login' && $common_alert_state['value'] === true}
				<div class="mt-12">
					<Alert state={'login'} color='red' title={LOGIN_ALERT.title} content={LOGIN_ALERT.content} />
				</div>
				{/if}



				<Button color="light"  class="w-full" on:click={() => open=true} >비밀번호 초기화</Button>


				<div style="display:flex; flex-direction:row; ">
					<button class="image-button" on:click={() => onKakaoLogin()} >
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img alt="카카오 로그인 버튼" src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" />
					</button>
					<button class="image-button" on:click={()=>onNaverLogin()}>
						<img
						src={naver_login_button}
							
						
							alt="네이버 로그인 버튼"
						/>
					</button>
	
				


				</div>
				
				
			</form>
		

	


	</Card>
</div>




	








