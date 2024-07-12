# @brainstack/nlsh

@brainstack/nlsh is a Node.js natural language shell terminal powered by AI. It allows users to interact with their terminal using natural language, where their intentions are understood, commands are identified, and the best unattended solutions are suggested and executed upon approval, based on predefined levels of trust.

## Features

- Understands user intentions through natural language processing.
- Identifies appropriate commands based on user queries.
- Suggests the most unattended solutions for executing commands.
- Executes commands upon user approval, considering different levels of trust.
- Provides feedback gathering for executed commands.

## Getting Started

To get started with @brainstack/nlsh, follow these steps:

1. Install the package using npm or yarn:

   ```bash
   npm install @brainstack/nlsh
   ```

   or

   ```bash
   yarn add @brainstack/nlsh
   ```

2. Import the `Nlsh` class into your project:

   ```typescript
   import { Nlsh } from '@brainstack/nlsh';
   ```

3. Initialize an instance of `Nlsh` with appropriate input and output sources:

   ```typescript
   const nlsh = new Nlsh(inputSource, output);
   ```

4. Start the terminal:

   ```typescript
   nlsh.start();
   ```

## How to Use

1. Launch the @brainstack/nlsh terminal.
2. Input your intentions or query using natural language.
3. @brainstack/nlsh will parse your intentions, identify commands, and suggest solutions.
4. Review the suggested commands and provide approval if required.
5. Commands will be executed based on the level of trust and user approval.
6. Provide feedback when prompted for executed commands.

## Examples

### Example 1: Find Process Listening on Port 44253

```plaintext
nitr0gen@WINDOWS:~/public/Packages/@brainstack/nlsh$ nlsh
Welcome to the AI Natural Language Shell (AINLSH)
Level of trust: AUTONOMOUS

What do you want to do?
> show me process including pid listening on port 44253
Level of trust AUTONOMOUS, automatic approval, no feedback

COMMAND    PID     USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
node       687 nitr0gen   20u  IPv4   17789      0t0  TCP localhost:44253 (LISTEN)
node       687 nitr0gen   32u  IPv4 3974165      0t0  TCP localhost:44253->localhost:53864 (ESTABLISHED)
node      1183 nitr0gen   25u  IPv4 3967852      0t0  TCP localhost:44253->localhost:53856 (ESTABLISHED)
node    726277 nitr0gen   19u  IPv4 3969877      0t0  TCP localhost:53856->localhost:44253 (ESTABLISHED)
node    726287 nitr0gen   19u  IPv4 3970764      0t0  TCP localhost:53864->localhost:44253 (ESTABLISHED)
What do you want to do?
> 
```

### Example 2: Displaying Docker Running Container

```plaintext
What do you want to do?
> show my docker container running
Level of trust AUTONOMOUS, automatic approval, no feedback

CONTAINER ID   IMAGE                                             COMMAND                  CREATED        STATUS                  PORTS                                                                  NAMES
754333d06990   public.ecr.aws/supabase/studio:20240101-8e4a094   "docker-entrypoint.s…"   19 hours ago   Up 19 hours (healthy)   0.0.0.0:54323->3000/tcp, :::54323->3000/tcp                            supabase_studio_simple-project
288fabe6ffed   public.ecr.aws/supabase/postgres-meta:v0.75.0     "docker-entrypoint.s…"   19 hours ago   Up 19 hours (healthy)   8080/tcp                                                               supabase_pg_meta_simple-project
b95de1360d8e   public.ecr.aws/supabase/edge-runtime:v1.33.5      "sh -c 'mkdir -p /ho…"   19 hours ago   Up 19 hours             8081/tcp                                                               supabase_edge_runtime_simple-project
29b1a4cea159   public.ecr.aws/supabase/imgproxy:v3.8.0           "imgproxy"               19 hours ago   Up 19 hours (healthy)   8080/tcp                                                               storage_imgproxy_simple-project
6ed93d79ca69   public.ecr.aws/supabase/storage-api:v0.48.2       "docker-entrypoint.s…"   19 hours ago   Up 19 hours (healthy)   5000/tcp                                                               supabase_storage_simple-project
c339208840cc   public.ecr.aws/supabase/postgrest:v12.0.2         "/bin/postgrest"         19 hours ago   Up 19 hours             3000/tcp                                                               supabase_rest_simple-project
7ead959723fe   public.ecr.aws/supabase/realtime:v2.25.50         "/usr/bin/tini -s -g…"   19 hours ago   Up 19 hours (healthy)   4000/tcp                                                               realtime-dev.supabase_realtime_simple-project
2706fe1a8dc5   public.ecr.aws/supabase/inbucket:3.0.3            "/start-inbucket.sh …"   19 hours ago   Up 19 hours (healthy)   1100/tcp, 2500/tcp, 0.0.0.0:54324->9000/tcp, :::54324->9000/tcp        supabase_inbucket_simple-project
4a8db32e0466   public.ecr.aws/supabase/gotrue:v2.143.0           "auth"                   19 hours ago   Up 19 hours (healthy)   9999/tcp                                                               supabase_auth_simple-project
0160565b729b   public.ecr.aws/supabase/kong:2.8.1                "sh -c 'cat <<'EOF' …"   19 hours ago   Up 19 hours (healthy)   8001/tcp, 8443-8444/tcp, 0.0.0.0:54321->8000/tcp, :::54321->8000/tcp   supabase_kong_simple-project
2aaf8a576989   public.ecr.aws/supabase/postgres:15.1.1.18        "sh -c 'cat <<'EOF' …"   19 hours ago   Up 19 hours (healthy)   0.0.0.0:54322->5432/tcp, :::54322->5432/tcp                            supabase_db_simple-project

```

### Example 3: Displaying the Routing Table

```plaintext
> show routing table
Explanations:
Running the command will display the routing table in the WSL2 Ubuntu shell.

Commands to be executed:
netstat -nr

Do you approve the following commands? (y/N): y
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         172.20.208.1    0.0.0.0         UG        0 0          0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U         0 0          0 docker0
172.18.0.0      0.0.0.0         255.255.0.0     U         0 0          0 br-c2bdd950ace6
172.20.208.0    0.0.0.0         255.255.240.0   U         0 0          0 eth0
Feedback: Did it do what you expected? (y/N): y
```

### Example 4: Getting Hostname

```plaintext
> what is my hostname ?
Explanations:
This command will display your hostname.

Commands to be executed:
hostname

Do you approve the following commands? (y/N): y
WINDOWS
Feedback: Did it do what you expected? (y/N): y
```

## Author

@brainstack/nlsh is maintained by the Brainstack team.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Feel free to contribute and improve @brainstack/nlsh! Happy coding!