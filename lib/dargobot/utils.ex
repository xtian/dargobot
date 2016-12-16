defmodule Dargobot.Utils do
  @moduledoc """
  Helper functions
  """

  @doc """
  Returns a list of the modules from a given directory inside `lib/`.
  Assumes conventional naming pattern, e.g.: `Foo.Bar` defined
  in `lib/foo/bar.ex`.
  """
  @spec get_modules(String.t) :: [module]
  def get_modules(path), do: get_modules(path, root: "lib")

  @spec get_modules(String.t, root: String.t) :: [module]
  def get_modules(path, root: root) do
    {:ok, files} = [root, path] |> Path.join |> File.ls

    Enum.map files, fn filename ->
      basename = Path.basename(filename, Path.extname(filename))

      [path, basename]
      |> Enum.map(&Macro.camelize/1)
      |> Module.safe_concat
    end
  end
end
