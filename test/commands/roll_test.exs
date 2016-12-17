defmodule Commands.RollTest do
  use ExUnit.Case, async: true

  alias Commands.Roll

  setup do
    {:ok, %{reply_info: {self(), "#foo"}}}
  end

  describe ".handle_event/2" do
    test "handles command with no arguments", context do
      {:ok, :state} = Roll.handle_event({:roll, [], context.reply_info}, :state)
      assert_received {:message, _, "#foo"}
    end

    test "handles command with one argument", context do
      {:ok, :state} = Roll.handle_event({:roll, ["10"], context.reply_info}, :state)
      assert_received {:message, _, "#foo"}
    end

    test "handles command with n arguments", context do
      {:ok, :state} = Roll.handle_event({:roll, ["2", "3"], context.reply_info}, :state)
      assert_received {:message, _, "#foo"}
    end

    test "handles command with bad arguments", context do
      {:ok, :state} = Roll.handle_event({:roll, ["bar"], context.reply_info}, :state)
      assert_received {:message, _, "#foo"}
    end
  end
end
