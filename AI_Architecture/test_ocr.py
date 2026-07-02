from ai.vision import VisionAnalyzer

def analyze_frame(
    self,
    frame_path
):

    print("\n[4/9] Running Vision Analysis...")

    analyzer = VisionAnalyzer()

    print(f"\nProcessing: {frame_path}")

    result = analyzer.process_frame(
        frame_path
    )

    print("\n========== RESULT ==========\n")

    for key, value in result.items():

        print(f"{key.upper()}:")

        print(value)

        print("\n----------------------------\n")

    print("========== END ==========\n")

    return result

analyze_frame("", "C:\\Users\\patel\\OneDrive\\Desktop\\Projects\\VidyAstraAI\\AI_Architecture\\outputs\\frames\\\dbms_lecture\\frame_0.jpg")
