"""
Stage Verge - Mobile Network Host Launcher
Serves app across your Wi-Fi network so you can open & install it on Android/iPhone.
"""
import http.server
import socketserver
import webbrowser
import threading
import socket
import sys
import os

PORT = 5055

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    # Bind to 0.0.0.0 so phone on same Wi-Fi can connect
    with socketserver.TCPServer(("0.0.0.0", PORT), QuietHandler) as httpd:
        local_ip = get_local_ip()
        print("\n=======================================================")
        print("  📱 STAGE VERGE - MOBILE READY")
        print("=======================================================")
        print(f"  👉 On your Phone (Chrome/Browser): http://{local_ip}:{PORT}")
        print(f"  👉 On your Computer:               http://localhost:{PORT}")
        print("=======================================================")
        print("  📲 HOW TO INSTALL ON PHONE AS REAL APP:")
        print("  1. Connect phone to the same Wi-Fi as this PC.")
        print(f"  2. Open Chrome on phone and go to: http://{local_ip}:{PORT}")
        print("  3. Tap ⋮ (menu) -> 'Install app' or 'Add to Home screen'.")
        print("=======================================================\n")
        httpd.serve_forever()

if __name__ == "__main__":
    t = threading.Thread(target=run_server, daemon=True)
    t.start()
    local_ip = get_local_ip()
    webbrowser.open(f"http://localhost:{PORT}")
    try:
        t.join()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
