defmodule Dargobot.Slack do
  @moduledoc """
  Handles incoming messages and sends responses
  """

  @type reply_info :: {pid, String.t}

  alias Dargobot.Router

  use Slack

  def handle_event(message = %{type: "message"}, _, state) do
    :ok = Router.dispatch(message.text, {self(), message.channel})
    {:ok, state}
  end
  def handle_event(_, _, state), do: {:ok, state}

  def handle_info({:message, text, channel}, slack, state) do
    :ok = send_message(text, channel, slack)
    {:ok, state}
  end
  def handle_info(_, _, state), do: {:ok, state}

  @spec reply(String.t, reply_info) :: any
  def reply(message, {pid, channel}) do
    send(pid, {:message, message, channel})
  end
end
