<?php

namespace PasswordlessWP;

class Singleton
{
  protected static $instances;

  protected function __construct()
  {
  }

  final private function __clone()
  {
  }

  public static function get_instance()
  {
    $class = get_called_class();

    if (!isset(self::$instances[$class])) {
      self::$instances[$class] = new $class;
    }
    return self::$instances[$class];
  }
}
