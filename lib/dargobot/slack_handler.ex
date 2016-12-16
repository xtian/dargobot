defmodule Dargobot.SlackHandler do
  @moduledoc """
  Handles incoming messages and sends responses
  """

  use Slack

  def handle_event(message = %{type: "message"}, _, state) do
    :ok = Dargobot.Router.dispatch(message.text, message.channel, self())
    {:ok, state}
  end
  def handle_event(_, _, state), do: {:ok, state}

  def handle_info({:message, text, channel}, slack, state) do
    :ok = send_message(text, channel, slack)
    {:ok, state}
  end
  def handle_info(_, _, state), do: {:ok, state}
end
