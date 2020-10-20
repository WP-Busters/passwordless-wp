<?php


namespace PasswordlessWP;


/**
 * Class AssetResolver
 *
 * This utility class resolves URIs to built assets in the /build directory of our theme. Built assets have a version
 * hash within their file name – each time the file changes, this hash will change which changes the file name.
 *
 * This class provides the functionality to resolve the file name using the generated manifest at
 * /build/mix-manifest.json without having to specify the version hash.
 *
 * @package PasswordlessWP
 */
class AssetResolver
{


	/**
	 * @var array
	 */
	private static $manifest = [];

	public static function resolveAll($key, $entry, $in_footer = false, $variables = array())
	{
		$is_debug =  defined('SCRIPT_DEBUG') && SCRIPT_DEBUG;

		if ($manifest = self::get_manifest()) {
			// $path = self::leading_slash_it($path);

			if (isset($manifest[$entry])) {
				$map = $manifest[$entry];

				$firstJsKey = null;
				$lastJsKey = null;
				$lastCssKey = null;

				foreach ($map as $name => $file) {
					if (preg_match('/\.js$/i', $name)) {
						$jsKey = $key . '-' . $entry . '-' . $name;
						\wp_enqueue_script(
							$jsKey,
							AssetResolver::resolve($entry, $name),
							$lastJsKey ? array('jquery', $lastJsKey)  : array('jquery'),
							$is_debug ? time() : false,
							$in_footer
						);

						$lastJsKey = $jsKey;
						if (!$firstJsKey) {
							$firstJsKey = $jsKey;
						}
					} else if (preg_match('/\.css$/i', $name)) {
						$cssKey = $key . '-' . $entry . '-' . $name;

						\wp_enqueue_style(
							$cssKey,
							AssetResolver::resolve($entry, $name),
							$lastCssKey ? array($lastCssKey) : array(),
							$is_debug ? time() : false
						);

						$lastCssKey = $cssKey;
					}
				}

				if ($variables && $firstJsKey) {
					foreach ($variables as $name => $data) {
						\wp_localize_script($firstJsKey, $name, $data);
					}
				}
			}
		}

		return false;
	}

	/**
	 * @param $path
	 *
	 * @return string
	 */
	public static function resolve($entry, $path)
	{
		if ($manifest = self::get_manifest()) {
			// $path = self::leading_slash_it($path);

			if (isset($manifest[$entry])) {
				$map = $manifest[$entry];

				if (isset($map[$path])) {
					return PLWP_URL . 'build' . self::leading_slash_it($map[$path]);
				}
			}
		}

		return false;
	}


	/**
	 * @return array|mixed|object
	 */
	private static function get_manifest()
	{
		if (!self::$manifest) {
			$manifest = PLWP_FOLDER . 'build/asset-manifest.json';

			if (
				$map = file_get_contents($manifest) and
				is_array($map = json_decode($map, true))
			) {
				self::$manifest = $map;
			}
		}

		return self::$manifest;
	}


	/**
	 * @param $string
	 *
	 * @return string
	 */
	private static function leading_slash_it($string)
	{
		return '/' . ltrim($string, '/\\');
	}
}
