defmodule Dargobot.ParserTest do
  use ExUnit.Case, async: true

  alias Dargobot.Parser

  describe ".parse_command/1" do
    test "parses bang messages into commands" do
      assert Parser.parse_command("!foo") == {:foo, []}
    end

    test "parses bang messages with arguments into commands" do
      assert Parser.parse_command("!foo bar") == {:foo, ["bar"]}
      assert Parser.parse_command("!foo bar baz") == {:foo, ["bar", "baz"]}
    end

    test "returns nil for non-commands" do
      assert Parser.parse_command("") == nil
      assert Parser.parse_command("foo") == nil
    end
  end
end
