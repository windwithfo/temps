<div class="main">
  <img src={url} alt=""/>
  <Nested text={obj}/>
  <p>{@html string}</p>
  <button on:click={handleClick}>
    Clicked {count} {count === 1 ? 'time' : 'times'}
  </button>
  <p>{count} doubled is {doubled}</p>
  <p>{numbers.join(' + ')} = {sum}</p>

  <button on:click={addNumber}>
    Add a number
  </button>
  {foo.bar}
  <br>
  {#if user.loggedIn}
  <button on:click={toggle}>
    Log out
  </button>
  {:else}
  <button on:click={toggle}>
    Log in
  </button>
  {/if}
  <ul>
    {#each cats as cat, i }
    <li>
      <a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
      {i + 1}:{cat.name}
      </a>
    </li>
    {/each}
  </ul>

  <button on:click={handleClick2}>
    generate random number
  </button>

  {#await promise then value}
    <p>the value is {value}</p>
  {/await}
  {#await promise}
	  <p>...waiting</p>
  {:then number}
	  <p>The number is {number}</p>
  {:catch error}
	  <p style="color: red">{error.message}</p>
  {/await}
</div>


<script lang="ts">
  import Nested from '../components/Nested.svelte'
  export let url = 'https://avatar.xueleyun.com/images/96x96_00000000000000000000000000000000.jpg'
  let string = `this string contains some <strong>HTML!!!</strong>`
  let count = 0
  $: doubled = count * 2
  $: console.log(`the count is ${count}`)
  function handleClick() {
    count += 1
  }
  let numbers = [1, 2, 3, 4]
  function addNumber() {
    numbers = [...numbers, numbers.length + 1]
  }
  $: sum = numbers.reduce((t, n) => t + n, 0)
  const obj = {
    foo: {
      bar: 'bar'
    }
  }
  $: console.log(obj)
  const foo = obj.foo
  foo.bar = 'baz'
  const user = { loggedIn: false }

  function toggle() {
    user.loggedIn = !user.loggedIn
  }
  let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
  ]
  async function getRandomNumber() {
		const res = await fetch(`/mock/random-number.json`)
		const text = await res.json()

		if (res.ok) {
			return text.num
		} else {
			throw new Error(text)
		}
  }

  let promise = getRandomNumber()
  function handleClick2() {
		promise = getRandomNumber()
	}
</script>

<style>
  .main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  p {
    color: purple;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }

  ul {
    text-align: left;
  }

  @media (min-width: 640px) {
    .main {
      max-width: none;
    }
  }
</style>