defmodule Dargobot.SlackHandler do
  @moduledoc """
  Handles incoming messages and sends responses
  """

  alias Dargobot.Router

  use Slack

  def handle_event(message, slack, state, dispatch \\ &Router.dispatch/3)
  def handle_event(message = %{type: "message"}, _, state, dispatch) do
    :ok = dispatch.(message.text, message.channel, self())
    {:ok, state}
  end
  def handle_event(_, _, state, _), do: {:ok, state}

  def handle_info(message, slack, state, send_message \\ &send_message/3)
  def handle_info({:message, text, channel}, slack, state, send_message) do
    :ok = send_message.(text, channel, slack)
    {:ok, state}
  end
  def handle_info(_, _, state, _), do: {:ok, state}
end
