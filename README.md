# Assignment Web Programming Course - HCMUT

Demo hiện tại của trang web từ template OneTech: [https://huynhsamha.github.io/cse-assignment-web-programming](https://huynhsamha.github.io/cse-assignment-web-programming)

## Quickstart

### Clone project
```
git clone https://github.com/huynhsamha/cse-assignment-web-programming.git

cd cse-assignment-web-programming
```

### Installing packages NPM
```
npm install
```

### Development
```
npm start
```

Open [localhost:4200](http://localhost:4200).


### Build production
```
npm run build
```
Directory `dist` is created.



## Hướng dẫn về source code

### Thư mục `views`
Chứa các giao diện màn hình khác nhau cho trang web

```bash
./views
├── blog.html
├── blog_single.html
├── cart.html
├── contact.html
├── index.html
├── product.html
└── shop.html
```
Mỗi file là tương ứng cho 1 giao diện màn hình cho web.



### Thư mục `layout`
Chứa các đoạn mã HTML cho các thành phần của trang web, sẽ được `require()` từ thư mục `src`.

```bash
./layouts
├── adverts.html
├── banner.html
├── banner2.html
├── brands.html
├── characteristics.html
├── copyright.html
├── deals_of_week.html
├── footer.html
├── header.html
├── hot_new_arrivals.html
├── newsletter.html
├── popular_categories.html
├── recently.html
└── trends.html
├── include
│   ├── meta.html
│   ├── script.html
│   ├── script_plugins.html
│   ├── stylesheet.html
│   └── stylesheet_plugins.html
```
Ví dụ file `footer.html` hay `copyright.html` được tái sử dụng ở nhiều trang khác nhau trong thư mục `src`:

Trong các file `index.html`, `cart.html`, ... có:
```html
    <!-- Footer -->
    ${require('../layouts/footer.html')}
    <!-- Copyright -->
    ${require('../layouts/copyright.html')}
```



### Thư mục `public`
Chứa các file public của trang web, khi build production, các file trong `public` sẽ được serve static từ web.

```bash
/public
├── css
|   └── bootstrap.min.css
├── images
├── js
|   ├── bootstrap.min.js
|   ├── jquery-3.3.1.min.js
|   └── popper.js
└── plugins
|   ├── Isotope
|   ├── OwlCarousel2
|   ├── easing
|   ├── FontAwesome5
|   ├── greensock
|   ├── jquery-ui
|   ├── parallax-js-master
|   ├── scrollmagic
|   └── slick-1.8.0
```

Ví dụ: Các file này sẽ được serve static từ web, ví dụ nếu tên miền trang web là `example.github.io` thì file `public/css/bootstrap.min.css` sẽ được serve là `example.github.io/css/bootstrap.min.css`



### Thư mục `src`
Chứa các file javascript cho tương ứng mỗi giao diện, hỗ trợ viết ES6, ES7 syntax.


### Thư mục `scss`
Chứa các file stylesheet cho mỗi giao diện. Các file này được sử dụng từ các file javascript tương ứng ở thư mục `src`. Ví dụ file `cart.js` thì import 2 file scss tương ứng cho nó:

```js
import '../scss/cart_styles.scss';
import '../scss/cart_responsive.scss';
```


Các files `scss` sau khi build production, sẽ được compile thành mã css, và dùng PostCSS để autoprefix các mã css cho các phiên bản trình duyệt khác nhau (danh sách các phiên bản trình duyệt hỗ trợ được định nghĩa trong file `.browserslistrc`, sẽ nói sau). Ngoài ra còn minimize các files này.


### File `.browserslistrc`
Là file cấu hình cho thư viện `postcss-preset-env` được sử dụng trong PostCSS, giúp hỗ trợ các mã CSS cho các trình duyệt khác nhau. Do đó lúc viết code trong các file scss, không cần viết các mã cho các trình duyệt khác nhau. Ví dụ, thay vì viết:
```css
div {
    -webkit-transition: width 2s, height 4s; /* Safari */
    transition: width 2s, height 4s;
}
```

Thì chỉ cần viết:
```css
div {
    transition: width 2s, height 4s;
}
```

Vào [đây](https://browserl.ist/?q=last+2+versions%2C+%3E+0.1%25%2C+ie+%3E%3D+6%2C+Firefox+ESR) để thay đổi các trình duyệt và các phiên bản khác nhau hỗ trợ.



## Danh sách các framework và plugins

+ Bootstrap v4.0 (https://getbootstrap.com/docs/4.0/getting-started/introduction/)
+ jQuery 3.3.1 (https://api.jquery.com/)
+ FontAwesome 5 (https://fontawesome.com/icons?d=gallery&m=free)
+ jQuery UI 1.12.1 (http://jqueryui.com/)
+ jQuery Easing v1.3 (http://gsgd.co.uk/sandbox/jquery/easing/)
+ Owl Carosuel 2 v2.2.1 (https://owlcarousel2.github.io/OwlCarousel2/)
+ parallax.js v1.5.0 (http://pixelcog.github.io/parallax.js/)
+ ScrollMagic v2.5.0 (http://scrollmagic.io/)
+ Slick (http://kenwheeler.github.io/slick/)
+ Isotope (https://isotope.metafizzy.co/)
+ jquery-confirm v3.3.0 (https://craftpip.github.io/jquery-confirm/)
