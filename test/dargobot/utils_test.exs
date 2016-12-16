defmodule Dargobot.UtilsTest do
  use ExUnit.Case, async: true

  alias Dargobot.Utils

  describe ".get_modules/2" do
    test "returns list of modules from directory" do
      modules = Utils.get_modules("test_modules", root: "test/fixtures")
      assert modules == [TestModules.Foo]
    end
  end
end
