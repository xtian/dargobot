defmodule Dargobot.Router do
  @moduledoc """
  Dispatches commands to handlers
  """

  alias Dargobot.{Parser, Utils}

  @spec start_link :: {:ok, pid}
  def start_link do
    {:ok, pid} = GenEvent.start_link(name: :router)
    {add_commands(pid), pid}
  end

  @spec dispatch(String.t, Dargobot.Slack.reply_info) :: :ok
  def dispatch(message, reply_info) do
    with {command, arguments} <- Parser.parse_command(message) do
      GenEvent.notify(:router, {command, arguments, reply_info})
    else
      nil -> :ok
    end
  end

  defp add_commands(pid) do
    "commands"
    |> Utils.get_modules
    |> Enum.reduce(:ok, fn module, :ok ->
      GenEvent.add_handler(pid, module, [])
    end)
  end
end
