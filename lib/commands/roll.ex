defmodule Commands.Roll do
  @moduledoc """
  Replies with a random integer between 1 and first argument (default: 100)
  """

  use GenEvent

  def handle_event({:roll, arguments, channel, reply_pid}, state) do
    reply = arguments |> random_integer |> to_string

    _ = send(reply_pid, {:message, reply, channel})
    {:ok, state}
  end

  defp random_integer([argument | _]) do
    with {argument, _} <- Integer.parse(argument) do
      max = argument |> max(1) |> min(100)
      Enum.random(1..max)
    else
      :error -> random_integer([])
    end
  end
  defp random_integer([]), do: random_integer(["100"])
end
