import subprocess

def run_command(command):
    print(f"_________________________\n\n\n")
    print(f"Ejecutando: {command}")

    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

    while True:
        output = process.stdout.readline()
        if not output and process.poll() is not None:
            break
        if output:
            print(output.strip().decode())
    rc = process.poll()

    if rc != 0:
        print('Error al ejecutar el comando: ', command)
        print('Abortando el script...')
        exit(1)
    else:
        print(f"{command} Done!")

commands = [
    "git pull",
    "pnpm i",
    "pnpx prisma migrate deploy",
    "pnpx prisma generate",
    "pnpm run build",
    "pm2 reload tinta-planner",
]

for command in commands:
    run_command(command)

print("Deploy completado con éxito.")
