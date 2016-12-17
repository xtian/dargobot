defmodule Commands.Roll do
  @moduledoc """
  Replies with a random integer between 1 and first argument (default: 100)
  """

  alias Dargobot.Slack

  use GenEvent

  @default 100

  @spec handle_event({:roll, [String.t], Slack.reply_info}, any) :: {:ok, any}
  def handle_event({:roll, arguments, reply_info}, state) do
    arguments
    |> List.first
    |> parse_integer
    |> random_integer
    |> to_string
    |> Slack.reply(reply_info)

    {:ok, state}
  end

  @spec parse_integer(nil | String.t) :: integer
  defp parse_integer(nil), do: @default
  defp parse_integer(string) do
    case Integer.parse(string) do
      {integer, _} -> integer
      :error -> @default
    end
  end

  @spec random_integer(integer) :: integer
  defp random_integer(input), do: Enum.random(1..max(input, 1))
end
