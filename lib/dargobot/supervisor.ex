defmodule Dargobot.Supervisor do
  @moduledoc """
  Starts up a client for each configured token
  """

  use Supervisor

  def start_link do
    Supervisor.start_link(__MODULE__, :ok)
  end

  def init(:ok) do
    :dargobot
    |> Application.get_env(:tokens)
    |> Enum.map(&build_worker/1)
    |> supervise(strategy: :one_for_one)
  end

  defp build_worker(token) do
    id = token |> hash() |> Base.encode16()
    worker(Dargobot.Client, [token], id: id)
  end

  defp hash(value) do
    :crypto.hash(:sha256, value)
  end
end
