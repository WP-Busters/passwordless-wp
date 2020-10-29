=== Passwordless WP - Login with your glance or fingerprint ===
Contributors: wpbusters
Tags: login, authentication, access, protection, security
Donate link: https://wpbusters.com/passwordless-wp/
Requires at least: 5.4
Tested up to: 5.5.1
Stable tag: trunk
Requires PHP: 7.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Use your glance or fingerprint using Touch ID or Face ID for easy and secure access. Improve your authentication security, you do not need a password.

== Description ==

= Use your glance or fingerprint using Touch ID or Face ID for easy and secure access. =

Improve your authentication security; you do not need a password.
When you enable Passwordless WP on your site, you can log in with a simple action.

[youtube https://www.youtube.com/watch?v=ZdhW089h69w]

The Web Authentication API (also known as WebAuthn) is a specification written by the W3C and FIDO, with the participation of Google, Mozilla, Microsoft, Yubico, and others. The API allows servers to register and authenticate users using public-key cryptography instead of a password.

= Safe facial or fingerprint data =

The plugin recieves data which is provided by the device, your deivce tells the plugin if your person was recognized or not. It does not store your data, only token will be stored in WordPress without the ability to use it. It's useless data without your physical access to the device.

= Focus on User Experience =

We follow the standard WordPress UX login page together with common-used elements to make using comfortable with a minimal footprint. Login and attach your device and passwordless login will available for the next login.

= FIDO 2 + WebAuthn = 

WebAuthn was officially recognized as a W3C web standard in March 2019. Web Authentication is a new standard enabling the creation and use of strong, attested, scoped, public key-based credentials by web applications, for the purpose of strongly authenticating users using hardware authenticators.

= GDPR Safe =

The web standard was created from the outset with a “privacy by design” approach and are a strong fit for GDPR compliance. Crucially, the plugin delivers authentication with no third-party involvement or tracking between accounts. And when it comes to biometrics, FIDO and WebAuthn standards prevent this information from being stored and matched in servers – it never leaves the user’s device do not allow for any biometric data to be captured.

= Browsers Supports =

Passwordless WP is currently supported in Google Chrome, Mozilla Firefox, Microsoft Edge and Apple Safari web browsers on iOS 14 and BigSur, as well as Windows 10 and Android platforms.

Passwordless WP requires HTTPS and SSL secure connection or localhost/127.0.0.1 environment. It supports only platform authenticator like Touch ID, Face ID, Windows Hello, Fingerprint and etc.

= Help with ideas and testing =

If you want to discuss and suggest any new ideas,
Join to Early Access Team group here: https://www.facebook.com/groups/676882319616540/

# Trademark notices

Registered trademarks and service marks are the property of their respective owners.

Apple, Face ID, iPad, iPhone, Mac, macOS, Safari, and Touch ID are trademarks of Apple Inc., registered in the U.S. and other countries.

Android, Chrome, Google, Google Chrome are trademarks of Google, Inc.

Microsoft, Windows are registered trademarks of Microsoft Corporation in the United States and other countries.

# Contributing

You can contribute or see sources to this plugin on [GitHub](https://github.com/WP-Busters/passwordless-wp).

== Installation ==

Installing Passwordless WP is as easy as 1-2-3!

1. Upload the plugin files to the `/wp-content/plugins/passwordless-wp` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress

Use plugin links on plugins page or wp-login.php page to log in, and you will be redirected to attaching page. After attaching credentials you can use your sensor for passwordless login.

[youtube https://youtu.be/DeLyL-dV59Y]

== Frequently Asked Questions ==

= Which browsers support? =

Chrome 67+, Firefox 60+, Edge 18+, Chrome 85+ on Android,
iOS: Safari
macOS: Chrome 67, Firefox 60, Safari 14+ on BigSur

= How does it work? =

It uses webauthn and FIDO 2, Web Authentication works hand in hand with other industry standards such as Credential Management Level 1 and FIDO 2.0 Client to Authenticator Protocol 2.

= Do you store my facial or confidential data? =

No, the plugin never scans your finger, face or stores any representation of it. Data is provided by the device, which only tells plugin if your person was recognized or not.

= Do you communicate with other services? = 

No, plugin does not make any external requests.

== Screenshots ==

1. Using the fingerprint sensor and Touch ID in Chrome to login
2. Attach your biometric credentials to your account
3. Use previously used names for faster login

== Changelog ==

v1.1.6
* RS support without gmp

v1.1.3
* PHP 7.2 fix in code trailing comma

v1.1.2
* Bypass for localhost/127.0.0.1 support without HTTPS
* Remove DB tables on uninstall

v1.1.1
* Success page
* Added test of error

v1.1.0
* Added special tables

v1.0.0
* First Release
