<?php

/**
 * Plugin Name: Passwordless WP - Login with your glance or fingerprint
 * Plugin URI: https://wpbusters.com/passwordless-wp/
 * Description: Use your glance or fingerprint using Touch ID or Face ID for easy and secure access. Improve your authentication security, you do not need a password.
 * Author: WP Busters
 * Author URI: https://wpbusters.com/
 * Text Domain: passwordless-wp
 * Version: 1.1.0
 * Domain Path: /languages
 * 
 */


if (!defined('ABSPATH')) {
  die;
}

include_once 'vendor/autoload.php';


define('WTL_SLUG', 'passwordless-wp');
define('WTL_VERSION', '1.1.0');
define('WTL_FOLDER', plugin_dir_path(__FILE__));
define('WTL_URL', plugin_dir_url(__FILE__));
define('WTL_PLUGIN', plugin_basename(__FILE__));

function plwp_load_plugin_textdomain()
{
  load_plugin_textdomain('passwordless-wp', false, dirname(plugin_basename(__FILE__)) . '/languages/');
}

include_once WTL_FOLDER . 'includes/db.php';
include_once WTL_FOLDER . 'includes/common.php';
include_once WTL_FOLDER . 'includes/scripts-login.php';
include_once WTL_FOLDER . 'includes/editing.php';
include_once WTL_FOLDER . 'includes/ajax.php';

add_action('plugins_loaded', 'plwp_load_plugin_textdomain');

function plwp_activate()
{
  plwp_create_tables();
}

register_activation_hook(__FILE__, 'plwp_activate');
