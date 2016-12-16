defmodule Commands.RollTest do
  use ExUnit.Case, async: true

  alias Commands.Roll

  describe ".handle_event/2" do
    test "handles command with no arguments" do
      {:ok, :state} = Roll.handle_event({:roll, [], "#foo", self()}, :state)
      assert_received {:message, _, "#foo"}
    end

    test "handles command with one argument" do
      {:ok, :state} = Roll.handle_event({:roll, ["10"], "#foo", self()}, :state)
      assert_received {:message, _, "#foo"}
    end

    test "handles command with n arguments" do
      {:ok, :state} = Roll.handle_event({:roll, ["2", "3"], "#foo", self()}, :state)
      assert_received {:message, _, "#foo"}
    end

    test "handles command with bad arguments" do
      {:ok, :state} = Roll.handle_event({:roll, ["bar"], "#foo", self()}, :state)
      assert_received {:message, _, "#foo"}
    end
  end
end
