# Multithreaded Runtime Execution
In NTE, all scripts are executed on a single background thread sequentially.

Due to the growing need for script content, JCM now expanded this so that scripts are executed with a total of **4** threads during runtime execution. (Parsing stage remains unaffected, it will still be parsed one-by-one on the main render thread).

Please note that the multithreaded execution is only applied across different script entry. The same script entry will always be executed in the same thread, therefore older content are expected to remain compatible without many issues. (Internally it allocates a script entry to a specific thread)

## Note on performance
Please note that the increased amount of threads is *not an excuse* to disregard script performance / efficiency, it only minimizes (but not eliminate) the execution speed of an individual script affecting other script execution.

Moreover, scripts that are slow to execute (excluding the use of sleeping) may result in higher CPU usage (Especially considering they are executed nearly every frame), which can potentially overload the player's computer. (Assuming this is on a multiplayer server / You plan on distributing the script)