<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Directus / Next.js / Tailwind starter</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/Calderis/Directus-Next-Starter/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://directus-next-starter-oj5hbr7nh-calderis.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/Calderis/Directus-Next-Starter/issues">Report Bug</a>
    ·
    <a href="https://github.com/Calderis/Directus-Next-Starter/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Directus-Next-Starter][product-screenshot]](https://directus-next-starter-oj5hbr7nh-calderis.vercel.app/login?callbackUrl=https://directus-next-starter.vercel.app)

I do love Directus. Here is a project to kickstart a website while using Directus as Backend service. It uses the auth api, the settings as well to get the Project name, the Project logo, the main site color, and so on. There is already a protected page example to help you fasten your development.

If you think about a feature or two, please help yourself and submit a pull request :) ! Just keep it simple, I do not plan on making this repo a full war-ready factory.

I hope it'll help you kickstart your next project.

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Directus](https://directus.io/)
* [Tailwind](https://tailwindcss.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Prerequisites

This project is only about the Next.js/React side of the deal. You therefore need to setup a Directus project on your own.

**Start a Directus**

You will require a Directus to mount your database. By default it does run on the port 8055.

You can start it through `yarn setup:directus` or follow the Directus quickstart.

* Quick start: [Getting started](https://directus.io/open-source/#install)

### Installation

1. Clone the repository and install dependancies

```
git clone https://github.com/Calderis/Directus-Next-Starter.git
cd Directus-Next-Starter
yarn
```

2. Configure your local environment

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):

```
cp .env.local.example .env.local
```

3. Setup Directus Env

You should setup Directus env with following env variables :
```
PASSWORD_RESET_URL_ALLOW_LIST="http://localhost:3000/login/password-reset"
EMAIL_FROM=
EMAIL_SMTP_HOST=
EMAIL_SMTP_PORT=
EMAIL_SMTP_USER=
EMAIL_SMTP_PASSWORD=
```

4. Start the application

To run your site locally, use:

```
yarn dev
```

To run it it production mode, use:

```
yarn build
yarn start
```

And run your directus in an other terminal

```
npx directus start
```

5. Change Directus Roles & Permissions from settings

You should allow the following for Public :
| Collection | Permission | Level |
|------------|------------|-------|
| directus_settings | read | full |
| directus_users | create | full |
| directus_users | read | email, avatar, title, description, id, tags |


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [x] Authentification ready
- [x] User settings page form
- [x] Fetch Directus Settings (require to unlock view permission into Public directus_settings)
- [x] Contact form
- [x] Policy page
- [x] Privacy page
- [ ] Search Page
- [ ] Footer
- [ ] Update profile picture
- [ ] Reload session on user settings change
- [ ] RGPD
    - [ ] Clear all user data feature
    - [ ] Get All user data

See the [open issues](https://github.com/Calderis/Directus-Next-Starter/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Calderis - r.wetteren@gmail.com

Project Link: [https://github.com/Calderis/Directus-Next-Starter](https://github.com/Calderis/Directus-Next-Starter)
Test it online: [https://directus-next-starter.vercel.app/](https://directus-next-starter.vercel.app/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-url]: https://github.com/Calderis/Directus-Next-Starter/graphs/contributors
[forks-url]: https://github.com/Calderis/Directus-Next-Starter/network/members
[stars-url]: https://github.com/Calderis/Directus-Next-Starter/stargazers
[issues-url]: https://github.com/Calderis/Directus-Next-Starter/issues
[license-url]: https://github.com/Calderis/Directus-Next-Starter/blob/master/LICENSE.txt
[product-screenshot]: https://i.imgur.com/bv5YaPU.png
