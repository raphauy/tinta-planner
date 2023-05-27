import subprocess

def run_command(command):
    print(f"\n\n\nEjecutando: {command}")
    process = subprocess.Popen(command, stdout=subprocess.PIPE, shell=True)
    output, error = process.communicate()

    if process.returncode != 0:
        print('Error al ejecutar el comando: ', command)
        if error:
            print('Error: ', error)
        print('Abortando el script...')
        exit(1)
    else:
        print('{command} Done!')

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
