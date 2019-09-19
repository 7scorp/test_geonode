![GeoNode](docs/about/img/geonode-logo_for_readme.gif "GeoNode")

Table of Contents
=================

-  [What is GeoNode?](#what-is-geonode)
-  [Try out GeoNode](#try-out-geonode)
-  [Install](#install)
-  [Learn GeoNode](#learn-geonode)
-  [Development](#development)
-  [Contributing](#contributing)
-  [Roadmap](#roadmap)
-  [Showcase](#showcase)
-  [Most useful links](#most-useful-links)
-  [Licensing](#licensing)

What is GeoNode?
----------------

GeoNode is a geospatial content management system, a platform for the
management and publication of geospatial data. It brings together mature
and stable open-source software projects under a consistent and
easy-to-use interface allowing non-specialized users to share data and
create interactive maps.

Data management tools built into GeoNode allow for integrated creation
of data, metadata, and map visualization. Each dataset in the system can
be shared publicly or restricted to allow access to only specific users.
Social features like user profiles and commenting and rating systems
allow for the development of communities around each platform to
facilitate the use, management, and quality control of the data the
GeoNode instance contains.

It is also designed to be a flexible platform that software developers
can extend, modify or integrate against to meet requirements in their
own applications.

Try out GeoNode
---------------

If you just want to try out GeoNode visit our official Demo online at:
http://master.demo.geonode.org. After your registration you will be able
to test all basic functionalities like uploading layers, creation of
maps, editing metadata, styles and much more. To get an overview what
GeoNode can do we recommend to have a look at the [Users
Workshop](http://docs.geonode.org/en/2.10.x/usage/index.html).

Install
-------

    The latest official release is 2.10!

GeoNode can be setup in different ways, flavors and plattforms. If
you´re planning to do development or install for production please visit
the offical GeoNode installation documentation:

- [Docker](http://docs.geonode.org/en/2.10.x/install/core/index.html#docker)
- [Ubuntu 18.04](http://docs.geonode.org/en/2.10.x/install/core/index.html#ubuntu-18-04)
- [CentOS 7.0](http://docs.geonode.org/en/2.10.x/install/core/index.html#centos-7-0)

Learn GeoNode
-------------

After you´ve finished the setup process make yourself familiar with the
general usage and settings of your GeoNodes instance. - the [User
Training](http://docs.geonode.org/en/2.10.x/usage/index.html)
is going in depth into what we can do. - the [Administrators
Workshop](http://docs.geonode.org/en/2.10.x/admin/index.html)
will guide you to the most important parts regarding management commands
and configuration settings.

Development
-----------

GeoNode is a web based GIS tool, and as such, in order to do development
on GeoNode itself or to integrate it into your own application, you
should be familiar with basic web development concepts as well as with
general GIS concepts.

For development GeoNode can be run in a 'development environment'. In
contrast to a 'production environment' development differs as it uses
lightweight components to speed up things.

To get you started have a look at the [Install
instructions](#install) which cover all what is needed to run GeoNode
for development. Further visit the the [Developer
workshop](http://docs.geonode.org/en/2.10.x/devel/index.html)
for a basic overview.

If you're planning of customizing your GeoNode instance, or to extend
it's functionalities it's not advisable to change core files in any
case. In this case it's common to use setup a [GeoNode Project
Template](https://github.com/GeoNode/geonode-project).

Contributing
------------

GeoNode is an open source project and contributors are needed to keep
this project moving forward. Learn more on how to contribute on our
[Community
Bylaws](https://github.com/GeoNode/geonode/wiki/Community-Bylaws).

Roadmap
-------

GeoNode's development roadmap is documented in a series of GeoNode
Improvement Projects (GNIPS). They are documented at [GeoNode Wiki](https://github.com/GeoNode/geonode/wiki/GeoNode-Improvement-Proposals).

GNIPS are considered to be large undertakings which will add a large
amount of features to the project. As such they are the topic of
community dicussion and guidance. The community discusses these on the
developer mailing list: http://lists.osgeo.org/pipermail/geonode-devel/

Showcase
--------

A handful of other Open Source projects extend GeoNode’s functionality
by tapping into the re-usability of Django applications. Visit our
gallery to see how the community uses GeoNode: [GeoNode
Showcase](http://geonode.org/gallery/).

The development community is very supportive of new projects and
contributes ideas and guidance for newcomers.

Most useful links
-----------------


**General**

- Project homepage: https://geonode.org
- Repository: https://github.com/GeoNode/geonode
- Offical Demo: http://master.demo.geonode.org
- GeoNode Wiki: https://github.com/GeoNode/geonode/wiki
- Issue tracker: https://github.com/GeoNode/geonode-project/issues

    In case of sensitive bugs like security vulnerabilities, please
    contact a GeoNode Core Developer directly instead of using issue
    tracker. We value your effort to improve the security and privacy of
    this project!

**Related projects**

- GeoNode Project: https://github.com/GeoNode/geonode-project
- GeoNode at Docker: https://hub.docker.com/u/geonode
- GeoNode OSGeo-Live: https://live.osgeo.org/en/


**Support**

- User Mailing List: https://lists.osgeo.org/cgi-bin/mailman/listinfo/geonode-users
- Developer Mailing List: https://lists.osgeo.org/cgi-bin/mailman/listinfo/geonode-devel
- Gitter Chat: https://gitter.im/GeoNode/general


Licensing
---------

GeoNode is Copyright 2018 Open Source Geospatial Foundation (OSGeo).

GeoNode is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your
option) any later version. GeoNode is distributed in the hope that it
will be useful, but WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with GeoNode. If not, see http://www.gnu.org/licenses.

**

![BIOPAMA GeoNode](docs/about/img/pen_biopama_logo_1.png "BIOPAMA")

Developments
=================

GIT repo push to branch
---------
**switch to different/new branch**

    git pull [ to get new branches ]
    git checkout <branch_name>  [ to switch to other branch ]

**after changes run form geonode_app folder:**

    git add --all .
    git commit -m "your message for this commit"
    git push -u origin <branch-name>

**BRANCHES NAMES:**

staging/production: using docker-compose.prd.yml for production or docker-compose.stg.yml for staging (freeze)
* master

development: using docker-compose.dev.yml file for development
* development

CSS eg: /geonode/static/geonode/css/base.css
---------
after changes run from geonode_app folder:

    docker exec -it django4geonode bash
    ..#/ python manage.py collectstatic

HTML Templates eg: /geonode/templates/base.HTML
---------
after changes run from geonode_app folder:

    docker exec -it django4geonode bash
    ..#/ python manage.py collectstatic

and restart docker cointainers from geonode_app folder:

    docker-compose -f docker-compose.dev.yml down   [using .dev. or .stg. or .prd. docker-compose yml file]
    docker-compose -f docker-compose.dev.yml up -d  [-d for daemon mode]


THEMING GeoNode - DJANGO interface
---------

- Simple Theming:  http://docs.geonode.org/en/2.10.x/admin/admin_panel/index.html#simple-theming
  > admin/geonode_themes/geonodethemecustomization/

- Code Theming : http://docs.geonode.org/en/2.10.x/basic/theme/index.html#templates-and-static-pages

Customize METADATA GeoNode
---------
- http://geonode.org/dev-workshop/

    1) patch apps.py
    2) edit /layers/templates/layouts/panels.html
    3) edit /base/templates/base/_resourcebase_info_panel.html

JRC EU COOKIES
---------

> main info https://webgate.ec.europa.eu/fpfis/wikis/display/webtools/Cookie+Consent+Kit#CookieConsentKit-Example


> CDN info  https://webgate.ec.europa.eu/fpfis/wikis/display/webtools/Cookie+Consent+Kit+-+Technical+details

- added main CDN script to django base.html template

    ```javascript
    <script type="text/javascript">
      // wrapping all forms in pages with the required div to bind eu cookies function to disable forms in case of no consent selected
      $('form').each(function(){
        // use the 2nd part of the domain here eg.  //geonode-rris.biopama.org >> biopama >> validate-consent-biopama
        $(this).wrap( '<div id="validate-consent-biopama"></div>' )
      })
    </script>
    <script src="https://ec.europa.eu/wel/cookie-consent/consent.js" type="text/javascript">//adding the main eu cookies cdn script</script>
    <script type="text/javascript">
      if (euCookieConsent.accepted("eu_cookie_consent")) {
        // run cookie generating javascript code
        // do whatever if cookies has been accepted
      }else{
        // do whatever if cookies has not been accepted
        alert('Cookies has not been accepted, some form section might be disabled. In order to use properly the website please accept Cookies and reload the page.');
      }
    </script>
    ```

- generate cookie_config.js >> http://webtools.ec.europa.eu/cookie-consent/wizard/index.php

    ```javascript
    <script src="{% static "geonode/js/base/cookie_config.js" %}?v={{ VERSION }}"></script>
    ```

> and configured the cookie_config.js with:

    ```javascript
    var consent_required_cookies = {
    	"a":{
        // add here all your cookies names
    		"biopama":["csrftoken","_osm_totp_token","eu_cookie_consent","sessionid"]}
    };
    var cookie_notice_url = {};
    ```

NGIX core setup variables
---------

- http://nginx.org/en/docs/http/ngx_http_core_module.html
