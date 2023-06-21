---
layout: post-layout.njk
title: How to close navbars on route change in Next.js
date: 2023-06-21
tags: ['post', 'web development']
---

In React, top level elements that rely on state that affect how they appear on screen can face some unique challenges, such as managing that state change between route cycles.

<!-- excerpt -->

Recently I was asked to create a basic ecommerce site for a friend and was faced with a challenge along these lines. When in a mobile layout, the user toggles the navbar to display a list of menu items. Clicking on a nav item routes the user to that path, but leads to unwanted behaviour where the user then has to close the menu on each re-route.

![Menu toggle](../../../../../assets/images/menu-toggle.gif) 

The desired experience is to have the navbar 'untoggle' on each re-route.

In turns out in Next.js this is extremely simple using the ```useRouter()``` function.

We use the useRouter function to detect when a new route has occurred, and once that re-route has occured, we can utilise ``useEffect()`` to run a component render side effect to close the menu.

First, we start with our default ```MobileNav``` component, which has an event listener for clicks on the hamburger icon, and which manages state to dynamically set the class of the drop down menu itself:

```jsx
function MobileNav() { 
  const [menuIsOpen, toggleMenuIsOpen] = useState(false);
 
  function handleHamburgerClick() {
    toggleMenuIsOpen(!menuIsOpen)
  }

  return (
    <nav className={s['mobile-nav']}>
        <HamburgerMenu onClick={handleHamburgerClick}/>

        <ul className={menuIsOpen ? s.active : undefined}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/custom-builds">Builds</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
        </ul>
    </nav>
  )
}
```

The first step is to add import and hook into the ``useRouter()`` function.

Import ```useRouter```:

```jsx
import { useRouter } from 'next/router';
```

Access useRouter by storing it in a ```const``` within the component function itself:

```jsx
function MobileNav() { 
  const [menuIsOpen, toggleMenuIsOpen] = useState(false);
  const router = useRouter();
  ....
```

Next we will implement ```useEffect()``` to hook into our component's life cycle and detect when the DOM updates.

Our ```useEffect() ```function call will use our router variable as its only dependency. This means every time the ```router``` changes, we will detect this change and run a side effect within the MobileNav component to update the state of ```menuIsOpen```.

Import useEffect

```jsx
import { useEffect, useState } from 'react';
```
Add the ```useEffect``` hook: 

```jsx 
 useEffect(() => {
    toggleMenuIsOpen(false);
  }, [router])
```

Now everytime a route change is detected, the MobileNav component will detect that route change and update the ``menuIsOpen`` state to ```false```, closing the menu:

![Menu toggle re route](../../../../../assets/images/menu-toggle-route.gif) 