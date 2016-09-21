defmodule Dargobot do
  @moduledoc """
  Personal Slack companion
  """

  use Application

  def start(_type, _args) do
    Dargobot.Supervisor.start_link
  end
end
