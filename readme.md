=== Passwordless WP ===
Contributors: wpbusters
Tags: login, authentication, access, protection, security
Requires at least: 5.4
Tested up to: 5.4
Stable tag: trunk
Requires PHP: 7.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Use your glance or fingerprint using Touch ID or Face ID for easy and secure access. Improve your authentication security; you do not need a password.

== Description ==

Use your glance or fingerprint with Touch ID or Face ID for easy and secure access. Improve your authentication security; you do not need a password.
When you enable Passwordless WP on your site, you can log in with a simple glance.

The Web Authentication API (also known as WebAuthn) is a specification written by the W3C and FIDO, with the participation of Google, Mozilla, Microsoft, Yubico, and others. The API allows servers to register and authenticate users using public-key cryptography instead of a password.

# Trademark notices

Registered trademarks and service marks are the property of their respective owners.

Apple, Face ID, iPad, iPhone, Mac, macOS, Safari, and Touch ID are trademarks of Apple Inc., registered in the U.S. and other countries.

Android, Chrome, Google, Google Chrome are trademarks of Google, Inc.

Microsoft, Windows are registered trademarks of Microsoft Corporation in the United States and other countries.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/passwordless-wp` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Use wp-login.php page to log in, and you will be redirected to attaching page.
4. You can use your sensor for passwordless login.
5. You can remove registered tokens in your profile.

== Frequently Asked Questions ==

= Which browsers support? =

Chrome 67+, Firefox 60+, Edge 18+, Chrome 85+ on Android,
iOS: Safari
macOS: Chrome 67, Firefox 60, Safari 14+ on BigSur

= How does it work? =

It uses webauthn and FIDO
Web Authentication works hand in hand with other industry standards such as Credential Management Level 1 and FIDO 2.0 Client to Authenticator Protocol 2.

= Do you store my facial or confidential data? =

The plugin never scans your finger, face or stores any representation of it. Data is provided by the device, which only tells plugin if your person was recognized or not.

== Screenshots ==

1. Using the fingerprint sensor and Touch ID in Chrome to login
2. Attach your biometric credentials to your account
3. Use previously used names for faster login
