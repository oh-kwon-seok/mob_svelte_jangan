<script>
	// @ts-nocheck
	import '../../../app.postcss';

	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, Chevron, MegaMenu   } from 'flowbite-svelte'
  import {MENU} from '$lib/module/common/constants'
	import { userModalOpen } from '$lib/store/user/function';
  import { userProductModalOpen } from '$lib/store/user_product/function';
  import { logout } from '$lib/store/common/function';
  
  
  import {login_state} from '$lib/store/common/state';
  
  import {user_form_state,user_modal_state} from '$lib/store/user/state';
  import {user_product_form_state,user_product_modal_state} from '$lib/store/user_product/state';
  import Util from '$lib/components/modal/user/Util.svelte';

  import ProductUtil from '$lib/components/modal/user_product/Util.svelte';
  
  import logo from '$lib/images/jangan_logo.png';

 
  
  let styles = {
    nav_link_style : '',
    nav_item_name : 'font-semibold dark:text-white',
    nav_item_help : 'text-sm font-light dark:text-gray-400',
  
  }



</script>
<main>
  <slot />
</main>

	<Navbar let:hidden let:toggle rounded >
        <NavBrand href="/">
            <img src={logo} class="mr-3 h-12 sm:h-9" alt="Food Logo"/>

            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">장안유통</span>
        </NavBrand>

        <NavHamburger on:click={toggle} />
        <NavUl {hidden}>
            
            
            <NavLi href="/home">주문하기</NavLi>
            <NavLi href="/sale/user_order_sub">주문현황</NavLi>
            <NavLi on:click={() => userProductModalOpen()}>즐겨찾기</NavLi>

            <NavLi href="/sale/user_temp_order">장바구니 조회</NavLi>

            
            <NavLi href="/sale/user_read_product">최근 본 상품 조회</NavLi>

            <NavLi href="/sale/user_buy_product">자주 구매한 상품 조회</NavLi>
        
            
            <NavLi on:click={() => userModalOpen()}>내정보 수정</NavLi>
            <NavLi on:click={() => logout()}>로그아웃</NavLi>
            


          </NavUl>
        {#if $user_modal_state['title'] === 'update'}
          <Util title="update" />
     
        {/if}
        {#if $user_product_modal_state['title'] === 'update'}
          <ProductUtil title="update" />
        {/if}
        

      </Navbar>


 


	
 