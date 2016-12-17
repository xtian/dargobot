defmodule Commands.Roll do
  @moduledoc """
  Replies with a random integer between 1 and first argument (default: 100)
  """

  alias Dargobot.Slack

  use GenEvent

  @spec handle_event({:roll, [String.t], Slack.reply_info}, any) :: {:ok, any}
  def handle_event({:roll, arguments, reply_info}, state) do
    arguments
    |> List.first
    |> parse_integer(100)
    |> random_integer
    |> to_string
    |> Slack.reply(reply_info)

    {:ok, state}
  end

  defp parse_integer(nil, default), do: default
  defp parse_integer(string, default) do
    case Integer.parse(string) do
      {integer, _} -> integer
      :error -> default
    end
  end

  defp random_integer(input), do: Enum.random(1..max(input, 1))
end
