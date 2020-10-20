<?php

use PasswordlessWP\PublicKeyCredentialSourceRepository;

function plwp_show_user_profile_list($profileuser)
{
  $user_id = $profileuser->ID;
  // $credentialSourceRepository = new PublicKeyCredentialSourceRepository($user_id);

  if (isset($_REQUEST['action']) && $_REQUEST['action'] === 'plwp_remove_token') {
    check_admin_referer('plwp_remove_token_' . $user_id);

    if ($user_id !== get_current_user_id() && !current_user_can('edit_users')) {
      wp_die(__('Sorry, you are not allowed to edit this user.'));
    }

    PublicKeyCredentialSourceRepository::removeCred($_REQUEST['key']);
  }


  $items = PublicKeyCredentialSourceRepository::ReadUserAll($user_id);

  $remove_url = add_query_arg('action', 'plwp_remove_token', get_edit_user_link($user_id));
?>
  <h2><?php _e('Passwordless Login Credentials'); ?></h2>
  <table id="wtl" class="form-table" role="presentation">
    <tr id="password" class="user-pass1-wrap">
      <th><label><?php _e('Registered Tokens'); ?></label></th>
      <td>
        <table class="wp-list-table widefat fixed striped pages">
          <thead>
            <tr>
              <td scope="col" class="manage-column column-author"><?php _e('Token'); ?></td>
              <td scope="col" class="manage-column column-author"><?php _e('Created'); ?></td>
            </tr>
          </thead>

          <tbody id="the-list">
            <?php if (!count($items)) : ?>
              <tr class="no-items">
                <td class="colspanchange" colspan="2"><?php _e('No credentials found.'); ?></td>
              </tr>
            <?php else : ?>
              <?php foreach ($items as $key => $item) : ?>
                <?php

                $remove = add_query_arg('key', urlencode($key), $remove_url);
                $remove = add_query_arg('_wpnonce', wp_create_nonce('plwp_remove_token_' . $user_id), $remove);

                ?>
                <tr class="iedit author-self level-0 type-plc hentry">
                  <td class="title column-title has-row-actions column-primary page-title">
                    <strong><?php esc_html_e($key); ?></strong>

                    <div class="row-actions">
                      <span class="trash">
                        <a href="<?php esc_attr_e($remove); ?>#wtl" onclick="if(!confirm('<?php echo esc_js(__('Do you want to remove?', 'passwordless-wp')); ?>')) { return false; }" class="submitdelete"><?php _e('Remove', 'passwordless-wp'); ?></a>
                    </div>
                  </td>
                  <td class="date column-date"><?php _e('Active'); ?><br><span><?php esc_html_e(date_i18n(get_option('date_format') . ' ' . get_option('time_format'), $item->getCounter())); ?></span></td>
                </tr>
              <?php endforeach; ?>
            <?php endif; ?>
          </tbody>
        </table>
        <?php if ($user_id === get_current_user_id()) : ?>
          <br />
          <a type="button" class="button" href="<?php esc_attr_e(add_query_arg('redirect_to', get_edit_user_link($user_id), plwp_get_url_attach_touch())); ?>"><?php _e('Register New Token', 'passwordless-wp'); ?></a>
        <?php endif; ?>
      </td>
    </tr>
  </table>
<?php
}

add_action('show_user_profile', 'plwp_show_user_profile_list', 160);
// add_action('edit_user_profile', 'plwp_show_user_profile_list', 160);
// edit_user_profile - other users

function plwp_plugin_settings_link($links)
{
  $settings_link = '<a href="' . esc_attr(get_edit_profile_url() . '#wtl') . '">Manage your credentials</a>';
  $add_link = '<a href="' . esc_attr(plwp_get_url_attach_touch()) . '">Add credentials</a>';
  array_unshift($links, $settings_link);
  array_unshift($links, $add_link);
  return $links;
}

add_filter("plugin_action_links_" . PLWP_PLUGIN, 'plwp_plugin_settings_link');
