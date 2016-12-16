defmodule Dargobot.Parser do
  @moduledoc """
  Parses message text into command and arguments
  """

  @doc """
  Parses messages in the form `!command ...` with optional
  space-separated arguments.
  """
  @spec parse_command(String.t) :: {:atom, [String.t]} | nil
  def parse_command("!" <> text) do
    [command | arguments] = String.split(text)
    {String.to_atom(command), arguments}
  end
  def parse_command(_), do: nil
end
