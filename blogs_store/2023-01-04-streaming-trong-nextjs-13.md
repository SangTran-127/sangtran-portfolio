---
slug: streaming-trong-nextjs-13
title: Streaming trong NextJS cùng với ReactJS 🎉
author: Sáng Trần
author_title: Regular guy who love programming
author_url: https://github.com/SangTran-127
author_image_url: https://avatars.githubusercontent.com/SangTran-127
image: https://res.cloudinary.com/sangtran127/image/upload/v1672756828/blog-assests/streaming-03-01-2022/Ghi_Ma%CC%80n_hi%CC%80nh_2023-01-03_lu%CC%81c_21.30.05_gyoveo.gif
type: "frontend"
tags: [nextjs, reactjs]
date: "2023-01-03"
---

NextJS 13 cùng với ReactJS 18 đã cho phép cơ chế data fetching mới là Streaming, bài viết sau đây sẽ đi vào trọng tâm của NextJS để biết được nó là gì? hoạt động như thế nào? thực hiện nó làm sao? 😊

<!-- truncate-->

### Mục lục

## 1. Streaming là gì

Streaming là phương pháp cho phép bạn hiển thị từng phần các UI Component thay vì phải chờ load hết rồi mới show ra. 
Ví dụ: 
![asd](https://res.cloudinary.com/sangtran127/image/upload/v1672756828/blog-assests/streaming-03-01-2022/Ghi_Ma%CC%80n_hi%CC%80nh_2023-01-03_lu%CC%81c_21.30.05_gyoveo.gif)

## 2. Vấn đề khi không có Streaming

Cùng với cơ chế [SSR(Server Side Rendering)](https://nextjs.org/docs/basic-features/pages#server-side-rendering) trong NextJS. Đầu tiên chúng ta phải cần tìm hiểu cách nó được render hiển thị ra người dùng ra sao. Bao gồm các bước theo tuần tự:
  1. 1)Mọi dữ liệu cần được fetch ở phía Server 
  2. 2)Server sẽ render ra file HTML của trang đó
  3. 3)Sau đó file HTML cùng với file JS sẽ được đóng gói chung và gửi về phía Client
  4. 4)Cuối cùng, React sẽ [hydrate](https://beta.reactjs.org/reference/react-dom/client/hydrateRoot) JS vào HTML để ta có thể tương tác được với trang đó

![SSR in NextJS](https://res.cloudinary.com/sangtran127/image/upload/v1672752476/blog-assests/streaming-03-01-2022/ssr-chart_osu9fe.webp)

Những thứ tự này thực hiện tuần tự và blocking(nghĩa là đến thằng này rồi mới tới thằng khác). **Server** chỉ render 1 lần duy khi nhất khi tất cả dữ liệu đã được fetch. Nhiệm vụ React ở phía Client sẽ hydrate 1 lần cho tất cả các Component trên 1 trang đó sau khi được **Server** trả về.
Điều đó có nghĩa rằng, các Component trong trang không được fetch bất đồng bộ mà phải chờ toàn bộ việc fetch các Component khác. Dẫn đến việc nguyên 1 trang không hiển thị gì cho đến khi toàn bộ các Component được fetch hết thì nó mới show. 

![SSR in NextJS](https://res.cloudinary.com/sangtran127/image/upload/v1672754116/blog-assests/streaming-03-01-2022/server-rendering-without-streaming_tvmlua.webp)

VD: Nếu 1 trang bao gồm Component A tốn 1s để fetch, Component B tốn 3s. Để show ra được trang đó ta phải mất đến 4s. 

## 3. Cách hoạt động

Do đó Streaming cho phép bạn gửi dần dần các đoạn HTML từ **Server** thay vì phải chờ toàn bộ rồi gửi 1 lượt. Điều này cho phép các trang được hiển thị sớm hơn mà không cần phải chờ đợi tất cả Component khác. Người dùng sẽ thấy UI của cả trang trước nhưng Component nào fetch lâu thì sẽ được render sau, chứ không còn chờ thật lâu rồi từ trang trắng xuất hiện toàn bộ Component.

Component nào có mức độ ưu tiên cao hơn sẽ được render ra trước như những thông tin không cần fetch dữ liệu sẽ được gửi ra trước và React sẽ [hydrate](https://beta.reactjs.org/reference/react-dom/client/hydrateRoot) ra trước. Thằng nào cần fetch dữ liệu lâu thì sẽ show ra loading hoặc skeleton cho đến khi thực hiện xong.

## 4. Thực hành 

Ta sẽ thực hành qua ví dụ To Do App đơn giản

Đầu tiên ta cần tạo project NextJS phiên bản 13 và sử dụng /app(cơ chế file system routing mới)

```
yarn create next-app --experimental-app streaming-next
```

Ở `page.tsx` ta sẽ setup như thế này:

```ts
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Streaming NextJS</h1>
        <h2>To Do List</h2>
      </div>
    </main>
  )
}
```
Sau đó tạo Component là `Todo.tsx`. Là **Server Component**, giả sử trong `Todo.tsx` ta fetch dữ liệu tốn **2s**: 

```ts
function getTodoList(): Promise<string[]> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            return res(['Sleep', 'Eat', 'Code'])
        }, 2000)
    })
}

export default async function Todo() {
    const todoList = await getTodoList()
    return (
        <div>
            <ul>
                {todoList.map((todo, idx) => (
                    <li key={idx}>
                        {todo}
                    </li>
                ))}
            </ul>
            <input type="text" />
            <button>Submit</button>
        </div>
    )
}
```

Import `Todo.tsx` vào `page.tsx`. 

```ts
 <main className={styles.main}>
      <div>
        <h1>Streaming NextJS</h1>
        <h2>To Do List</h2>
      </div>
      {/* @ts-expect-error */}
      <Todo />
    </main>
```

Nó sẽ báo màu đỏ do `Todo.tsx` kiểu trả về là **Promise<JSX.Element>** chứ không phải **JSX.Element**. Nên ta sẽ thêm dòng `ts-expect-error`.

Khi bạn chạy `page.tsx`, lúc này sẽ quay lại vấn đề là toàn bộ trang sẽ phải chờ 2s sau đó hiển thị hết toàn bộ trang. Vì lúc này mình chưa sử dụng Streaming.

Để sử dụng Streaming, ta xài thêm [Suspense](https://beta.reactjs.org/reference/react/Suspense) của React để wrap Component Todo lại, cú pháp như sau:

```ts
export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Streaming NextJS</h1>
        <h2>To Do List</h2>
        <Suspense fallback={<div>Loading...</div>}>
          {/* @ts-expect-error */}
          <ToDo />
        </Suspense>
      </div>
    </main>
  )
}
```

Đối với `props` fallback, chúng ta có thể truyền `loading.tsx`(1 loại Component đặc biệt của NextJS) hoặc là Skeleton để trang trí cho việc loading.

Chúng ta cần sử dụng các React Hook để code tiếp phần Add To Do.

## 5. Sử dụng Client Component trong Server Component

Đối với `Todo.tsx` là **Server Component**, việc sử dụng các hooks của React là điều không thể. Do đó chúng ta sẽ dùng 1 cách đó chính là tạo **Client Component** là `AddToDo.tsx` rồi truyền todoList dạng `props` và chuyển phần render todoList cho`AddToDo.tsx`:

```ts
import AddToDo from "./AddToDo"

function getTodoList(): Promise<string[]> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            return res(['Sleep', 'Eat', 'Code'])
        }, 2000)
    })
}

export default async function Todo() {
    const todoList = await getTodoList()
    return (
        <AddToDo todoList={todoList} />
    )
}
```

Sử dụng từ khoá `use client` để khai báo **Client Component**

```ts
"use client"

interface AddToDoProps {
    todoList: string[]
}

export default function AddToDo({ todoList }: AddToDoProps) {
    return (
        <div>
            <ul>
                {todoList.map((todo, idx) => (
                    <li key={idx}>
                        {todo}
                    </li>
                ))}
            </ul>
            <input type="text" />
            <button>Submit</button>
        </div>
    )
}
```

Vậy là ta có thể sử dụng các hooks để code phần thêm các todo rồi. Do đây là ví dụ nên mình sẽ không giải thích phần thêm các todo. Trên mạng có rất nhiều hướng dẫn chi tiết, mình sẽ show code thôi.

```ts
"use client"

import React, { useState } from "react"

interface AddToDoProps {
    todoList: string[]
}

export default function AddToDo({ todoList }: AddToDoProps) {
    const [list, setList] = useState<string[]>(todoList)
    const [todo, setTodo] = useState<string>("")
    function handleSubmit() {
        setList([...list, todo])
        setTodo("")
    }
    return (
        <div>
            <ul>
                {list.map((todo, idx) => (
                    <li key={idx}>
                        {todo}
                    </li>
                ))}
            </ul>
            <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
```

Kết quả:
![final result](https://res.cloudinary.com/sangtran127/image/upload/v1672771326/blog-assests/streaming-03-01-2022/Ghi_M%C3%A0n_h%C3%ACnh_2023-01-04_l%C3%BAc_01.38.54_zlap9p.gif)

Cuối cùng chúng ta đã tìm hiểu được cách hoạt cũng như là cách sử dụng Streaming trong NextJS.
Hi vọng bài chia sẻ này hữu ích với mọi người! 

> Cheers 🍺
 
 **Nguồn tham khảo:**
 
[Document NextJS](https://beta.nextjs.org/docs/data-fetching/streaming-and-suspense) - Vercel

[React Streaming In Depth: NextJS! Remix! DIY!](https://www.youtube.com/watch?v=o3JWb04DRIs&t=205s) - Jack Herrington