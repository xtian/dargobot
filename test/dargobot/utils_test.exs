defmodule Dargobot.UtilsTest do
  use ExUnit.Case, async: true

  alias Dargobot.Utils

  describe ".get_modules/2" do
    test "returns list of modules from directory" do
      modules = Utils.get_modules("test_modules", root: "test/fixtures")
      assert Enum.sort(modules) == [TestModules.Bar, TestModules.Foo]
    end

    test "raises exception for non-existent directory" do
      assert_raise MatchError, fn ->
        Utils.get_modules("foo", root: "test/fixtures")
      end
    end
  end
end
