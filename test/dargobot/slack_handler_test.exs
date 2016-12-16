defmodule Dargobot.SlackHandlerTest do
  use ExUnit.Case, async: true

  alias Dargobot.SlackHandler

  def dispatch(text, channel, _) do
    send self(), {text, channel}
    :ok
  end

  describe ".handle_event/4" do
    test "dispatches messages to router" do
      event = %{type: "message", text: "!foo", channel: "#bar"}
      {:ok, :state} = SlackHandler.handle_event(event, nil, :state, &dispatch/3)

      assert_received {"!foo", "#bar"}
    end

    test "returns ok for all other events" do
      event = %{type: "foo"}
      {:ok, :state} = SlackHandler.handle_event(event, nil, :state, &dispatch/3)

      refute_received _
    end
  end

  describe ".handle_info/3" do
    test "sends message commands to client" do
      message = {:message, "foo", "#bar"}
      {:ok, :state} = SlackHandler.handle_info(message, nil, :state, &dispatch/3)

      assert_received {"foo", "#bar"}
    end

    test "returns ok for all other messages" do
      {:ok, :state} = SlackHandler.handle_info({:foo}, nil, :state, &dispatch/3)

      refute_received _
    end
  end
end
