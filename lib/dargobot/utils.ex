defmodule Dargobot.Utils do
  @moduledoc """
  Helper functions
  """

  @doc """
  Returns a list of the modules from a given directory inside `lib/`.
  Assumes conventional naming pattern, e.g.: `Foo.Bar` defined
  in `lib/foo/bar.ex`.
  """
  @spec get_modules(String.t, keyword) :: [module]
  def get_modules(path, options \\ []) do
    root = Keyword.get(options, :root, "lib")
    {:ok, files} = [root, path] |> Path.join |> File.ls

    Enum.map files, fn filename ->
      [path, remove_extension(filename)]
      |> Enum.map(&Macro.camelize/1)
      |> Module.safe_concat
    end
  end

  @spec remove_extension(String.t) :: String.t
  defp remove_extension(filename), do: Path.basename(filename, Path.extname(filename))
end
