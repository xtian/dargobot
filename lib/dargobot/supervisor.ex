defmodule Dargobot.Supervisor do
  @moduledoc """
  Starts up a router and one client for each configured token
  """

  use Supervisor

  def start_link do
    Supervisor.start_link(__MODULE__, :ok)
  end

  def init(:ok) do
    router = worker(Dargobot.Router, [])
    clients =
      :dargobot
      |> Application.get_env(:tokens)
      |> Enum.map(&build_client/1)

    supervise([router | clients], strategy: :one_for_one)
  end

  defp build_client(token) do
    id = token |> hash |> Base.encode16
    worker(Slack.Bot, [Dargobot.Slack, [], token], id: id)
  end

  defp hash(value), do: :crypto.hash(:sha256, value)
end
