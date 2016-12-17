defmodule Dargobot.SlackTest do
  use ExUnit.Case, async: true

  alias Dargobot.Slack

  describe ".reply/2" do
    test "sends a message to the passed process" do
      Slack.reply("foo", {self(), "#bar"})
      assert_received {:message, "foo", "#bar"}
    end
  end
end
